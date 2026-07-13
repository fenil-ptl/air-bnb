'use client';

import type { ReactNode } from 'react';

import { QueryProvider } from './query-provider';
import { ToastProvider } from './toast-provider';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
};
