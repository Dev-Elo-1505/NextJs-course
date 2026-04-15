import { NextRequest, NextResponse } from "next/server";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export const users: User[] = [];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, age } = body;

  if (!email || !name || typeof age !== "number") {
    return NextResponse.json(
      {
        success: false,
        error: "name, email and numeric age are required",
      },
      { status: 400 },
    );
  }

  const emailExists = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return NextResponse.json(
      {
        success: false,
        error: "Email already exists",
      },
      { status: 409 },
    );
  }

  if (age < 13) {
    return NextResponse.json(
      {
        success: false,
        error: "User should be 13 and above",
      },
      { status: 422 },
    );
  }
  
  let newUser: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    age: age,
  };
  users.push(newUser);
  return NextResponse.json({
    success: true,
    users,
  });
}
