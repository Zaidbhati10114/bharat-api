interface Env {
    RATE_LIMITER: DurableObjectNamespace;
}

import { getPincode } from "./pincode";
import { rateLimit } from "./middleware/rateLimit";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function json(
    body: unknown,
    requestId: string,
    etag: string,
    request: Request,
    init: ResponseInit = {}
) {
    if (request.headers.get("If-None-Match") === etag) {
        return new Response(null, {
            status: 304,
            headers: {
                ETag: etag,
                ...corsHeaders,
            },
        });
    }

    return new Response(JSON.stringify(body), {
        ...init,
        headers: {
            "content-type": "application/json",
            "cache-control": "public, max-age=86400, s-maxage=86400",
            "x-bharatapi-version": "v1",
            "x-bharatapi-request-id": requestId,
            "x-bharatapi-tier": "anonymous",
            ETag: etag,
            ...corsHeaders,
            ...(init.headers || {}),
        },
    });
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const requestId = crypto.randomUUID();

        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: corsHeaders,
            });
        }

        const limit = await rateLimit(request, env);

        if (limit instanceof Response) {
            return limit;
        }

        const rateHeaders = {
            "X-RateLimit-Limit": String(limit.limit),
            "X-RateLimit-Remaining": String(limit.remaining),
            "X-RateLimit-Reset": String(limit.reset),
        };

        const url = new URL(request.url);

        if (!url.pathname.startsWith("/api/v1/pincode/")) {
            return json(
                {
                    success: false,
                    error: {
                        code: "NOT_FOUND",
                        message: "Route not found",
                    },
                },
                requestId,
                '"v1:not-found"',
                request,
                {
                    status: 404,
                    headers: rateHeaders,
                }
            );
        }

        const code = url.pathname.split("/").pop() ?? "";

        if (!/^\d{6}$/.test(code)) {
            return json(
                {
                    success: false,
                    error: {
                        code: "INVALID_PINCODE",
                        message: "PIN code must contain exactly six digits.",
                    },
                },
                requestId,
                '"v1:invalid-pincode"',
                request,
                {
                    status: 400,
                    headers: rateHeaders,
                }
            );
        }

        const result = getPincode(code);

        if (!result) {
            return json(
                {
                    success: false,
                    error: {
                        code: "PINCODE_NOT_FOUND",
                        message: "No matching record exists.",
                    },
                },
                requestId,
                `"v1:${code}:not-found"`,
                request,
                {
                    status: 404,
                    headers: rateHeaders,
                }
            );
        }

        return json(
            {
                success: true,
                meta: {
                    version: "v1",
                    requestId,
                    timestamp: new Date().toISOString(),
                },
                data: {
                    pincode: code,
                    ...result,
                },
            },
            requestId,
            `"v1:${code}"`,
            request,
            {
                headers: rateHeaders,
            }
        );
    },
};

export { RateLimiter } from "./durable/RateLimiter";