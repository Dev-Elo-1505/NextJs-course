# Next.js Route Handlers Crash Course (Hands-On + Exercises)

## Course Goal

By the end of this crash course, you will be able to build real API endpoints in the Next.js App Router using Route Handlers, validate input, return correct HTTP status codes, handle dynamic routes, and ship a small REST API.

## Prerequisites

- Basic JavaScript or TypeScript
- Basic HTTP understanding (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, status codes)
- This project already running with `npm run dev`

---

## 0) Quick Mental Model

In App Router projects, a Route Handler is a `route.ts` (or `route.js`) file inside the `app` directory. It handles HTTP requests directly.

Example path mapping:

- `app/api/users/route.ts` -> `/api/users`
- `app/api/products/[id]/route.ts` -> `/api/products/:id`

Route Handlers are server-only code, so they are ideal for:

- Database access
- Secret keys / private APIs
- Input validation
- Auth checks

---

## 1) Route Handler Basics

Create `app/api/hello/route.ts` (you already have one folder; verify filename is `route.ts`):

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Hello from Next.js Route Handler",
  });
}
```

Test with browser or terminal:

```bash
curl http://localhost:3000/api/hello
```

### Exercise 1

1. Add `time` to the response using `new Date().toISOString()`.
2. Add a custom header `x-course: route-handlers`.

Hint:

```ts
return NextResponse.json(data, {
  status: 200,
  headers: { "x-course": "route-handlers" },
});
```

---

## 2) Reading Query Params and Request Info

Create `app/api/search/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const term = request.nextUrl.searchParams.get("term") || "";
  const limit = Number(request.nextUrl.searchParams.get("limit") || "10");

  return NextResponse.json({
    success: true,
    term,
    limit,
  });
}
```

Test:

```bash
curl "http://localhost:3000/api/search?term=nextjs&limit=5"
```

### Exercise 2

1. Validate `limit` so it must be from 1 to 50.
2. Return `400` with a helpful message if invalid.

---

## 3) Reading Request Body (`POST`)

Create `app/api/users/route.ts` with in-memory storage for learning:

```ts
import { NextRequest, NextResponse } from "next/server";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

const users: User[] = [];

export async function GET() {
  return NextResponse.json({ success: true, data: users });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, age } = body;

  if (!name || !email || typeof age !== "number") {
    return NextResponse.json(
      {
        success: false,
        error: "name, email and numeric age are required",
      },
      { status: 400 },
    );
  }

  const emailExists = users.some((u) => u.email === email);
  if (emailExists) {
    return NextResponse.json(
      { success: false, error: "email already exists" },
      { status: 409 },
    );
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    age,
  };

  users.push(newUser);

  return NextResponse.json({ success: true, data: newUser }, { status: 201 });
}
```

Test:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Joy","email":"joy@example.com","age":22}'

curl http://localhost:3000/api/users
```

### Exercise 3

1. Reject `age < 13` with status `422`.
2. Trim name and email before storing.
3. Make email case-insensitive for duplicate check.

---

## 4) Dynamic Route Handlers

Create `app/api/users/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

const users: User[] = [];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }

  users.splice(index, 1);

  return NextResponse.json({ success: true, message: "User deleted" });
}
```

### Exercise 4

1. Add `PATCH` to update `name` and `age`.
2. Return `404` if user does not exist.
3. Validate type of `age` during update.

---

## 5) Status Codes and Error Patterns

Recommended mapping:

- `200 OK`: successful read/update
- `201 Created`: successful create
- `204 No Content`: successful delete (optional alternative)
- `400 Bad Request`: invalid input format
- `401 Unauthorized`: not logged in
- `403 Forbidden`: logged in but not allowed
- `404 Not Found`: resource missing
- `409 Conflict`: duplicate resource
- `422 Unprocessable Entity`: semantically invalid input
- `500 Internal Server Error`: unexpected server issue

Reusable pattern:

```ts
function ok(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}

function fail(error: string, status = 400) {
  return Response.json({ success: false, error }, { status });
}
```

### Exercise 5

Refactor one route file to use `ok(...)` and `fail(...)` helper functions.

---

## 6) Input Validation with Zod (Recommended)

Install:

```bash
npm install zod
```

Validation example:

```ts
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().min(13),
});
```

Usage:

```ts
const body = await request.json();
const parsed = createUserSchema.safeParse(body);

if (!parsed.success) {
  return NextResponse.json(
    { success: false, error: parsed.error.flatten() },
    { status: 422 },
  );
}

const { name, email, age } = parsed.data;
```

### Exercise 6

1. Add Zod validation to `POST /api/users`.
2. Return field-level errors in response.

---

## 7) Headers, Cookies, and CORS

### Custom headers

```ts
return NextResponse.json(data, {
  headers: {
    "x-api-version": "1",
  },
});
```

### Cookie example

```ts
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set("session", "abc123", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  return NextResponse.json({ success: true });
}
```

### CORS (manual basic example)

```ts
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
```

### Exercise 7

1. Add `OPTIONS` to one route.
2. Add `Access-Control-Allow-Origin` for local frontend testing.

---

## 8) Caching and Runtime Controls

Useful route segment options:

```ts
export const runtime = "nodejs"; // or "edge"
export const dynamic = "force-dynamic";
```

Use `dynamic = "force-dynamic"` when response must always be fresh.

### Exercise 8

Apply runtime config to one endpoint and explain why you chose it.

---

## 9) Mini Project: Users API (CRUD)

Build these endpoints:

- `GET /api/users` -> list users
- `POST /api/users` -> create user
- `GET /api/users/:id` -> get one user
- `PATCH /api/users/:id` -> update user
- `DELETE /api/users/:id` -> delete user

Requirements:

- Validation with Zod
- Consistent response shape
- Proper status codes
- Duplicate email handling
- Meaningful error messages

### Suggested response shape

```json
{
  "success": true,
  "data": {}
}
```

```json
{
  "success": false,
  "error": "message"
}
```

### Manual test checklist

- Create user with valid payload -> `201`
- Create duplicate email -> `409`
- Create with invalid email -> `422`
- Fetch unknown ID -> `404`
- Update age to invalid type -> `422`
- Delete existing user -> `200` or `204`

---

## 10) Practice Drills (Fast)

1. Build `GET /api/health` returning uptime and timestamp.
2. Build `POST /api/echo` returning exactly what user sent.
3. Build `GET /api/math/add?a=2&b=3` returning sum.
4. Build `POST /api/login` and set a fake cookie.
5. Build `DELETE /api/users/:id` with `204` (no response body).

---

## 11) Challenge Exercises (Interview Style)

1. Add pagination to `GET /api/users` with `page` and `limit` query params.
2. Add filtering by `name` and sorting by `createdAt`.
3. Add request ID (`x-request-id`) to every response.
4. Add basic API key guard using `Authorization` header.
5. Convert in-memory data to real DB (Prisma or MongoDB).

---

## 12) Common Mistakes to Avoid

- Forgetting `await request.json()`
- Not returning status codes for failures
- Using browser-only APIs in route handlers
- Returning inconsistent response shapes
- No input validation
- Trusting client input blindly

---

## 13) How to Practice This Course Properly

1. Implement one section at a time.
2. Test each endpoint with curl or Postman before moving on.
3. Break things intentionally (bad input) to verify error handling.
4. Refactor after it works.
5. Repeat mini project from scratch without looking.

---

## 14) Bonus: Real-World Structure

As your app grows:

- Keep route handlers thin
- Move business logic into `lib/` services
- Move schemas into `lib/validators`
- Move DB access into `lib/db`
- Keep consistent API response helpers

Example layout:

```txt
app/
  api/
    users/
      route.ts
    users/
      [id]/
        route.ts
lib/
  db.ts
  validators/
    user.ts
  services/
    users.ts
  http/
    responses.ts
```

---

## 15) Completion Checklist

- [ ] I can create Route Handlers in App Router
- [ ] I can read params, query, and body safely
- [ ] I return correct status codes
- [ ] I can validate payloads with Zod
- [ ] I can build CRUD endpoints with dynamic routes
- [ ] I can test APIs with curl confidently

If you complete all exercises and challenges, you are production-ready for Route Handler fundamentals.
