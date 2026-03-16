"use client";

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthRequiredProps {
  children: ReactNode;
  roles?: Array<'admin' | 'student' | 'employer'>;
}

export const AuthRequired: React.FC<AuthRequiredProps> = ({ children, roles }) => {
  const router = useRouter();
  const auth = useAuth();
  const { user, loading, isAuthenticated } = auth || { user: null, loading: true, isAuthenticated: false };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-60" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  if (roles && roles.length > 0 && !roles.includes(user?.role as any)) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};
