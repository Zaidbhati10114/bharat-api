import { NextRequest } from "next/server";

import { success, failure } from "@/lib/api-response";
import { getPincode } from "@/lib/pincode";
import { pincodeSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ code: string }> }
) {
    const { code } = await context.params;

    const parsed = pincodeSchema.safeParse(code);

    if (!parsed.success) {
        return failure(
            "INVALID_PINCODE",
            "PIN code must contain exactly 6 digits.",
            400
        );
    }

    const data = getPincode(code);

    if (!data) {
        return failure(
            "PINCODE_NOT_FOUND",
            `PIN code ${code} was not found.`,
            404
        );
    }

    return success(
        {
            pincode: code,
            state: data.state,
            stateLGD: data.stateLGD,
            districtCount: data.districts.length,
            districts: data.districts,
        },
        200,
        {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        }
    );
}