/* eslint-disable @typescript-eslint/no-unused-vars */
// lib/getUserRole.ts

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export async function getUserRole(req: unknown): Promise<string | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return (session.user as { role?: string }).role ?? null;
}