import { NextRequest, NextResponse } from "next/server";
import { users } from "../route";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = users.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: user })
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = users.find((u) => u.id === id)
  const body = await request.json()

  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: user })
}
