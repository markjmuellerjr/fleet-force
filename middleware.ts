// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from './utils/db';
import User from './models/User';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/premium'];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // Redirect unauthenticated users to sign in
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    await connectToDatabase();
    const user = await User.findOne({ email: token.email });

    if (user) {
      const now = new Date();

      if (user.subscriptionStatus === 'active' || (user.subscriptionStatus === 'trialing' && user.trialEndsAt && user.trialEndsAt > now)) {
        // Allow access
        return NextResponse.next();
      } else {
        // Redirect to subscription page
        return NextResponse.redirect(new URL('/pricing', req.url));
      }
    }
  }

  // Allow all other requests
  return NextResponse.next();
}