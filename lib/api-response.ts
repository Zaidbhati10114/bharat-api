import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

function meta() {
    return {
        version: "v1",
        requestId: randomUUID(),
        timestamp: new Date().toISOString(),
    };
}

export function success(
    data: unknown,
    status = 200,
    headers?: HeadersInit
) {
    return NextResponse.json(
        {
            success: true,
            meta: meta(),
            data,
        },
        {
            status,
            headers,
        }
    );
}

export function failure(
    code: string,
    message: string,
    status = 400,
    headers?: HeadersInit
) {
    return NextResponse.json(
        {
            success: false,
            meta: meta(),
            error: {
                code,
                message,
            },
        },
        {
            status,
            headers,
        }
    );
}