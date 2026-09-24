import { hashKey } from "../utils/hash";

interface Env {
    RATE_LIMITER: DurableObjectNamespace;
}

export interface RateLimitData {
    limit: number;
    remaining: number;
    reset: number;
}

export async function rateLimit(
    request: Request,
    env: Env,
): Promise<Response | RateLimitData> {
    const ip =
        request.headers.get("CF-Connecting-IP") ??
        request.headers.get("x-forwarded-for") ??
        "local";

    const key = await hashKey(ip);

    const id = env.RATE_LIMITER.idFromName(key);
    const stub = env.RATE_LIMITER.get(id);

    const res = await stub.fetch("https://rate-limit/check", {
        method: "POST",
        body: JSON.stringify({ key }),
    });

    const data = (await res.json()) as RateLimitData & { allowed: boolean };

    if (!data.allowed) {
        return new Response(
            JSON.stringify({
                success: false,
                error: {
                    code: "RATE_LIMIT_EXCEEDED",
                    message: "You've reached today's anonymous usage limit.",
                },
            }),
            {
                status: 429,
                headers: {
                    "content-type": "application/json",
                    "Retry-After": "60",
                    "X-RateLimit-Limit": String(data.limit),
                    "X-RateLimit-Remaining": String(data.remaining),
                    "X-RateLimit-Reset": String(data.reset),
                    "X-BharatAPI-Tier": "anonymous",
                },
            },
        );
    }

    return data;
}