
import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { verifyOTP } from '@/lib/auth/otp';
import { sendEmail } from '@/lib/email';

async function saveOTP(email: string, otp: string) {
    await prisma.oTP.create({
        data: {
            user: { connect: { email } },
            code: otp,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        }
    });
}

export async function POST(req: NextRequest) {
    const { email, otp, step } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (step === 'request') {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await saveOTP(email, otp);
        await sendEmail({ to: email, user, template: "otp", otp });
        return NextResponse.json({ success: true });
    }

    if (step === 'verify') {
        const valid = await verifyOTP(email, otp);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
        }
        const userAgent = req.headers.get('user-agent');
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');
        const token = crypto.randomUUID();
        const session = await createSession(token, user.id, userAgent, ip);
        return NextResponse.json({ session });
    }

    return NextResponse.json({ error: 'Invalid step' }, { status: 400 });
}
