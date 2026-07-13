'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ToastKind = 'default';

type ToastItem = {
  id: number;
  message: string;
  kind: ToastKind;
};

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showToast = useCallback((message: string) => {
    const id = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2200);

    setToasts((current) => [...current, { id, message, kind: 'default' }]);
  }, []);

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {isMounted
        ? createPortal(
            <div
              aria-live="polite"
              aria-atomic="true"
              className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-[calc(100vw-3rem)] max-w-sm -translate-x-1/2 flex-col items-center gap-3"
            >
              {toasts.map((toast) => (
                <div
                  key={toast.id}
                  className="pointer-events-auto flex w-fit items-center justify-center rounded-[18px] bg-[#222] px-5 py-3 text-[18px] leading-none text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
                >
                  {toast.message}
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
