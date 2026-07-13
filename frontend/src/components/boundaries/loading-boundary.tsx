'use client';

import { Suspense, type ReactNode } from 'react';

interface LoadingBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const LoadingBoundary = ({ children, fallback }: LoadingBoundaryProps) => {
  return <Suspense fallback={fallback ?? null}>{children}</Suspense>;
};
