// types/next-auth.d.ts

import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: any;
      id: string;
      name: string;
      email: string;
      image?: string;
      // Add other custom properties if needed
    };
    // Add other session properties if needed
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    // Add other custom properties if needed
  }
}