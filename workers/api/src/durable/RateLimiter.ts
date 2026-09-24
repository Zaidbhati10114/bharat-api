interface Env {
    RATE_LIMITER: DurableObjectNamespace;
}

interface RateLimitRequest {
    key: string;
}

interface RateLimitResult {
    allowed: boolean;
    limit: number;
    remaining: number;
    reset: number;
}

const BURST = 20;
const REFILL_RATE = 5; // Tokens restored per second
const MINUTE_LIMIT = 300;
const DAY_LIMIT = 2000;

export class RateLimiter {
    constructor(
        private state: DurableObjectState,
        private env: Env,
    ) { }

    async fetch(request: Request): Promise<Response> {
        // The middleware routes each hashed IP to its own Durable Object.
        // We don't need the value here anymore, but we keep the contract.
        const { key: _key } = (await request.json()) as RateLimitRequest;

        const now = Date.now();

        const minuteKey = `min:${Math.floor(now / 60000)}`;
        const dayKey = `day:${new Date().toISOString().slice(0, 10)}`;

        let minuteCount = (await this.state.storage.get<number>(minuteKey)) ?? 0;
        let dayCount = (await this.state.storage.get<number>(dayKey)) ?? 0;

        // ---------- Token Bucket ----------
        const bucket =
            (await this.state.storage.get<{
                tokens: number;
                lastRefill: number;
            }>("bucket")) ?? {
                tokens: BURST,
                lastRefill: now,
            };

        // Refill tokens based on elapsed time.
        const elapsed = (now - bucket.lastRefill) / 1000;
        bucket.tokens = Math.min(BURST, bucket.tokens + elapsed * REFILL_RATE);
        bucket.lastRefill = now;

        // Burst protection
        if (bucket.tokens < 1) {
            return Response.json(
                {
                    allowed: false,
                    limit: DAY_LIMIT,
                    remaining: Math.max(0, DAY_LIMIT - dayCount),
                    reset: tomorrowMidnight(),
                } satisfies RateLimitResult,
                {
                    status: 429,
                    headers: {
                        "Retry-After": "1",
                    },
                },
            );
        }

        // Minute + Daily limits
        if (minuteCount >= MINUTE_LIMIT || dayCount >= DAY_LIMIT) {
            return Response.json(
                {
                    allowed: false,
                    limit: DAY_LIMIT,
                    remaining: Math.max(0, DAY_LIMIT - dayCount),
                    reset: tomorrowMidnight(),
                } satisfies RateLimitResult,
                {
                    status: 429,
                    headers: {
                        "Retry-After": "60",
                    },
                },
            );
        }

        // Consume one token
        bucket.tokens -= 1;
        minuteCount += 1;
        dayCount += 1;

        await Promise.all([
            this.state.storage.put("bucket", bucket),
            this.state.storage.put(minuteKey, minuteCount),
            this.state.storage.put(dayKey, dayCount),
            this.state.storage.setAlarm(now + 24 * 60 * 60 * 1000),
        ]);

        return Response.json({
            allowed: true,
            limit: DAY_LIMIT,
            remaining: DAY_LIMIT - dayCount,
            reset: tomorrowMidnight(),
        } satisfies RateLimitResult);
    }

    async alarm() {
        // Cleanup old counters and bucket state after inactivity.
        await this.state.storage.deleteAll();
    }
}

function tomorrowMidnight(): number {
    const d = new Date();
    d.setUTCHours(24, 0, 0, 0);
    return Math.floor(d.getTime() / 1000);
}