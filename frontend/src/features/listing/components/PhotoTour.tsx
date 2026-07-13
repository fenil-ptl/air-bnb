'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Image as ListingImage } from '@airbnb-clone/shared';
import type { ListingData } from '../types/listing.types';
import { getListingImageSrc } from '../utils/listing-image.utils';
import { Lightbox } from './Lightbox';

interface PhotoTourProps {
  listing: ListingData;
  initialImageId: string | null;
  onClose: () => void;
}

interface PhotoGroupProps {
  category: string;
  images: ListingImage[];
  onImageClick?: (imageId: string) => void;
}

const formatCategoryLabel = (category: string): string =>
  category
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

const PhotoGroup = ({ category, images, onImageClick }: PhotoGroupProps) => (
  <section aria-labelledby={`photo-group-${category}`} className="space-y-4">
    <h2 id={`photo-group-${category}`} className="text-xl font-semibold text-neutral-900">
      {formatCategoryLabel(category)}
    </h2>

    <div className="grid gap-5 md:grid-cols-2">
      {images.map((image) => (
        <button
          key={image.id}
          type="button"
          aria-label={`View ${image.alt}`}
          onClick={() => onImageClick?.(image.id)}
          className="group block w-full text-left"
        >
          <div
            className="relative w-full overflow-hidden rounded-[20px] bg-neutral-200"
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <Image
              src={getListingImageSrc(image)}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              className="object-cover transition duration-200 group-hover:scale-[1.01]"
            />
          </div>
        </button>
      ))}
    </div>
  </section>
);

export const PhotoTour = ({ listing, initialImageId, onClose }: PhotoTourProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    closeButtonRef.current?.focus();

    return () => {
      window.cancelAnimationFrame(frame);
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
      previousActiveElementRef.current?.focus();
    };
  }, []);

  const handleClose = useCallback(() => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    setIsVisible(false);

    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
    }, 180);
  }, [isClosing, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  const groupedImages = useMemo(() => {
    const orderedImages = [...listing.images].sort((a, b) => a.order - b.order);
    const grouped = new Map<string, ListingImage[]>();

    orderedImages.forEach((image) => {
      const existingImages = grouped.get(image.category) ?? [];
      existingImages.push(image);
      grouped.set(image.category, existingImages);
    });

    return Array.from(grouped.entries()).map(([category, images]) => ({
      category,
      images,
    }));
  }, [listing.images]);

  useEffect(() => {
    if (!initialImageId) {
      return;
    }

    const target = document.getElementById(`photo-${initialImageId}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [initialImageId, groupedImages]);

  const handleImageSelect = useCallback((imageId: string): void => {
    setSelectedImageId(imageId);
  }, []);

  const handleLightboxClose = useCallback((): void => {
    setSelectedImageId(null);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 overflow-y-auto bg-white transition-opacity duration-200 ${
          isVisible && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`Photo tour — ${listing.title}`} className="min-h-screen bg-white">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close photo tour"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 transition-colors duration-150 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <p className="max-w-sm truncate text-sm font-semibold text-neutral-800">
            {listing.title}
          </p>

          <div className="h-9 w-9" aria-hidden="true" />
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-8 pb-20 sm:px-8 lg:px-10 lg:py-10">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Photo tour
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
              {listing.title}
            </h1>
          </div>

          <div className="space-y-12">
            {groupedImages.map(({ category, images }) => (
              <div id={`photo-${images[0]?.id ?? category}`} key={category} className="space-y-4">
                <PhotoGroup category={category} images={images} onImageClick={handleImageSelect} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>

    <Lightbox
      images={listing.images}
      initialImageId={selectedImageId}
      isOpen={selectedImageId !== null}
      onClose={handleLightboxClose}
    />
    </>
  );
};
