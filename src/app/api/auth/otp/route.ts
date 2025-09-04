import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createOTP } from '@/lib/auth/otp';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }
  const otp = await createOTP(user.id);
  await sendEmail({ to: email, user, template: "otp", otp });
  return NextResponse.json({ success: true });
}
