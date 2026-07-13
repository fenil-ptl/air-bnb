'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Image as ListingImage } from '@airbnb-clone/shared';
import { getListingImageSrc } from '../utils/listing-image.utils';

interface LightboxProps {
  images: ListingImage[];
  initialImageId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const getFocusableElements = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
};

export const Lightbox = ({ images, initialImageId, isOpen, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const currentImage = images[currentIndex];

  const handleClose = useCallback((): void => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || images.length === 0) {
      return;
    }

    const initialIndex = images.findIndex((image) => image.id === initialImageId);
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
    previousActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousScrollY = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setCurrentIndex((previousIndex) => (previousIndex - 1 + images.length) % images.length);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setCurrentIndex((previousIndex) => (previousIndex + 1) % images.length);
      }
    };

    const handleFocusTrap = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab' || !dialogRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleFocusTrap);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleFocusTrap);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      window.scrollTo({ top: previousScrollY, behavior: 'auto' });
      previousActiveElementRef.current?.focus();
    };
  }, [handleClose, initialImageId, images, isOpen]);

  const goToPrevious = (): void => {
    setCurrentIndex((previousIndex) => (previousIndex - 1 + images.length) % images.length);
  };

  const goToNext = (): void => {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % images.length);
  };

  const imageCountLabel = useMemo(() => {
    if (images.length === 0) {
      return '0 of 0';
    }

    return `${currentIndex + 1} of ${images.length}`;
  }, [currentIndex, images.length]);

  if (!isOpen || !currentImage) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-[2px] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Image viewer — ${currentImage.alt}`}
        tabIndex={-1}
        className="flex h-full w-full flex-col"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-4 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close image viewer"
              className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-200 ease-out hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="text-sm font-medium text-white/90">
              <p className="text-base font-semibold tracking-[-0.01em]">{currentImage.alt}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/70">{imageCountLabel}</p>
            </div>
          </div>

          <div className="text-sm font-medium text-white/70">
            {images.length > 1 ? 'Use the arrow keys or on-screen controls to browse' : 'Single image'}
          </div>
        </header>

        <div className="flex-1 px-4 pb-6 pt-4 sm:px-6 lg:px-8 lg:pt-6">
          <div className="mx-auto flex h-full max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
            <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950/70 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
              <div className="relative mx-auto flex h-full min-h-[320px] w-full items-center justify-center sm:min-h-[420px] lg:min-h-[560px]">
                <Image
                  src={getListingImageSrc(currentImage)}
                  alt={currentImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                  className="object-contain transition-transform duration-300 ease-out"
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="View previous image"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    aria-label="View next image"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <aside className="w-full max-w-[320px] shrink-0 rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.25)] backdrop-blur-sm lg:h-full lg:max-w-[280px] lg:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Thumbnails
              </p>
              <div className="mt-4 flex flex-wrap gap-3 lg:max-h-[calc(100vh-12rem)] lg:flex-col lg:overflow-y-auto lg:pr-1">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    aria-label={`View ${image.alt}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-16 w-16 overflow-hidden rounded-xl border transition-all duration-200 ease-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                      index === currentIndex ? 'border-white shadow-lg' : 'border-white/20'
                    }`}
                  >
                    <Image
                      src={getListingImageSrc(image)}
                      alt={image.alt}
                      fill
                      sizes="64px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
