import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const term = request.nextUrl.searchParams.get('term') || ""
    const limit = Number(request.nextUrl.searchParams.get("limit") || "10")

    if (limit < 1 || limit > 50) {
        return NextResponse.json({
        success: false,
        status: 400,
        error: "Limit should be from 1 to 50"
    })
    }

    return NextResponse.json({
        success: true,
        term,
        limit
    })
}