import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const API_VERSION = "v1";

function createHeaders(requestId: string, extra: HeadersInit = {}) {
    return {
        "Content-Type": "application/json",
        "X-BharatAPI-Version": API_VERSION,
        "X-BharatAPI-Request-ID": requestId,
        ...extra,
    };
}

export function success<T>(
    data: T,
    status = 200,
    headers: HeadersInit = {}
) {
    const requestId = randomUUID();

    return NextResponse.json(
        {
            success: true,
            meta: {
                version: API_VERSION,
                requestId,
                timestamp: new Date().toISOString(),
            },
            data,
        },
        {
            status,
            headers: createHeaders(requestId, headers),
        }
    );
}

export function failure(
    code: string,
    message: string,
    status = 400,
    headers: HeadersInit = {}
) {
    const requestId = randomUUID();

    return NextResponse.json(
        {
            success: false,
            meta: {
                version: API_VERSION,
                requestId,
                timestamp: new Date().toISOString(),
            },
            error: {
                code,
                message,
            },
        },
        {
            status,
            headers: createHeaders(requestId, headers),
        }
    );
}