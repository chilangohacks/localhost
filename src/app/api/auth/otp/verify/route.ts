import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyOTP } from '@/lib/auth/otp';

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return NextResponse.json({ error: 'Email y código requeridos' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }
  const valid = await verifyOTP(user.id, otp);
  if (!valid) {
    return NextResponse.json({ error: 'Código incorrecto o expirado.' }, { status: 401 });
  }
  // Create session and set cookie
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const userAgent = req.headers.get('user-agent') || '';
  const ip = req.headers.get('x-forwarded-for') || '';
  const { createSession } = await import('@/lib/auth/session');
  await createSession(token, user.id, userAgent, ip);
  const response = NextResponse.json({ success: true });
  response.cookies.set('session', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return response;
}
