'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface UsePhotoTourReturn {
  isOpen: boolean;
  initialImageId: string | null;
  open: (imageId?: string) => void;
  close: () => void;
}

interface BodyScrollSnapshot {
  overflow: string;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
}

const PHOTO_TOUR_HISTORY_STATE = 'photo-tour-open';

export const usePhotoTour = (): UsePhotoTourReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialImageId, setInitialImageId] = useState<string | null>(null);
  const scrollYRef = useRef(0);
  const bodyStyleRef = useRef<BodyScrollSnapshot>({
    overflow: '',
    position: '',
    top: '',
    left: '',
    right: '',
    width: '',
  });

  const restoreBodyScroll = useCallback(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.style.overflow = bodyStyleRef.current.overflow;
    document.body.style.position = bodyStyleRef.current.position;
    document.body.style.top = bodyStyleRef.current.top;
    document.body.style.left = bodyStyleRef.current.left;
    document.body.style.right = bodyStyleRef.current.right;
    document.body.style.width = bodyStyleRef.current.width;
    document.documentElement.style.overflow = bodyStyleRef.current.overflow;

    window.scrollTo({ top: scrollYRef.current, behavior: 'auto' });
  }, []);

  const lockBodyScroll = useCallback(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    scrollYRef.current = window.scrollY;
    bodyStyleRef.current = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setInitialImageId(null);
    restoreBodyScroll();
  }, [restoreBodyScroll]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    lockBodyScroll();
    window.history.pushState({ [PHOTO_TOUR_HISTORY_STATE]: true }, '', window.location.href);

    const handlePopState = (): void => {
      close();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [close, isOpen, lockBodyScroll]);

  const open = useCallback((imageId?: string): void => {
    setInitialImageId(imageId ?? null);
    setIsOpen(true);
  }, []);

  return useMemo(
    () => ({ isOpen, initialImageId, open, close }),
    [close, initialImageId, isOpen, open],
  );
};
