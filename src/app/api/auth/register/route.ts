import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { email, name, github, dob, phone, shirtSize, track, school, major, gradYear, dietary } = await req.json();
    let gradYearDate: Date | undefined = undefined;
    if (gradYear) {
      // Accept year as string or number, convert to Date
      const year = typeof gradYear === "string" ? parseInt(gradYear) : gradYear;
      if (!isNaN(year)) {
        gradYearDate = new Date(`${year}-01-01T00:00:00.000Z`);
      }
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        github,
        dob: dob ? new Date(dob) : undefined,
        phone,
        shirtSize,
        track,
        school,
        major,
        gradYear: gradYearDate,
        dietary,
      },
    });
  return NextResponse.json({ user });
}
