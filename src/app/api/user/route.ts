import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateSessionToken } from "@/lib/auth/session";

// GET: Get current user info
export async function GET(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const session = await validateSessionToken(token);
  if (!session.user) return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

// PATCH: Update user info
export async function PATCH(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const session = await validateSessionToken(token);
  if (!session.user) return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  const body = await req.json();
  try {
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: "Update failed", details: e }, { status: 400 });
  }
}
