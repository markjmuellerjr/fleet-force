// hooks/useRole.ts
'use client';

import { useSession } from 'next-auth/react';

const useRole = (requiredRole: string | string[]) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return { authorized: false, isLoading: true };
  if (!session) return { authorized: false, isLoading: false };

  const userRole = (session.user as { role?: string })?.role;

  if (!userRole) return { authorized: false, isLoading: false };

  if (Array.isArray(requiredRole)) {
    return { authorized: requiredRole.includes(userRole), isLoading: false };
  }

  return { authorized: userRole === requiredRole, isLoading: false };
};export default useRole;