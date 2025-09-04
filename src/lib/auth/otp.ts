import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export function generateOTP(length = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

export async function createOTP(userId: string, expiresInMinutes = 10) {
  const code = generateOTP();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
  await prisma.oTP.create({
    data: {
      userId,
      code,
      expiresAt,
    },
  });
  return code;
}

export async function verifyOTP(userId: string, code: string) {
  const otp = await prisma.oTP.findFirst({
    where: {
      userId,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });
  if (!otp) return false;
  await prisma.oTP.update({ where: { id: otp.id }, data: { used: true } });
  return true;
}
