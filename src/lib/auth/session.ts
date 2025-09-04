import type { User, Session } from "@/generated/prisma";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import prisma from "@/lib/prisma";
import { NextRequest } from 'next/server';

export async function createSession(
  token: string,
  userId: string,
  userAgent: string | null,
  ip: string | null
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    userAgent: userAgent ?? "",
    ip: ip ?? "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await prisma.oTP.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.session.create({
    data: session,
  });

  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;

  if (user.isBanned) {
    // For banned users, return session and user info so they can see the ban message
    // but mark them as banned in the response
    return { session, user, isBanned: true, banReason: user.banReason };
  }

  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
}

export async function invalidateSession(token: string): Promise<void> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateAllSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { userId } });
}

export async function destroySession(req: NextRequest): Promise<void> {
  const token = req.cookies.get('session')?.value;
  if (!token) return;
  await invalidateSession(token);
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: Session; user: User; isBanned: true; banReason: string | null }
  | { session: null; user: null }
  | { session: null; user: null; isBanned: true; banReason: string | null };
