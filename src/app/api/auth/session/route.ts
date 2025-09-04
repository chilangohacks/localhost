import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/src/lib/auth/session';

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'No session' }, { status: 401 });
  }
  return NextResponse.json({ session });
}
