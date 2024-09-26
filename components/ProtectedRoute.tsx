// components/ProtectedRoute.tsx
'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[]; // Single role or array of roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/signin'); // Redirect to sign-in if not authenticated
    } else if (requiredRole) {
      const userRole = session.user.role;
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(userRole)) {
          router.push('/unauthorized'); // Redirect if role not permitted
        }
      } else {
        if (userRole !== requiredRole) {
          router.push('/unauthorized');
        }
      }
    }
  }, [session, status, router, requiredRole]);

  if (status === 'loading' || !session) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;