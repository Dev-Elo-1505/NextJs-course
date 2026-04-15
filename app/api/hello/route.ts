import { NextResponse } from "next/server";

export async function GET() {
    let today = new Date()
    return NextResponse.json({
        success: true,
        message: 'Hello from nextjs route handlers',
        time: today.toISOString(),
        headers: {"x-course": "route-handlers"}
    })
}