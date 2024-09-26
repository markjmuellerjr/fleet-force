// lib/getUserRole.ts

import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export async function getUserRole(req: NextRequest): Promise<string | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return (session.user as any).role;
}