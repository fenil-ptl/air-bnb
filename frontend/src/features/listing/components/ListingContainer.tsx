'use client';

import { useState } from 'react';
import type { ListingData } from '../types/listing.types';
import { usePhotoTour } from '../hooks/usePhotoTour';
import { FooterSection } from './FooterSection';
import { HeroGallery } from './HeroGallery';
import { ListingContent } from './ListingContent';
import { ListingNavbar } from './ListingNavbar';
import { PropertyHeader } from './PropertyHeader';
import { PhotoTour } from './PhotoTour';
import { useToast } from '@/providers/toast-provider';

interface ListingContainerProps {
  listing: ListingData;
}

export const ListingContainer = ({ listing }: ListingContainerProps) => {
  const { isOpen, initialImageId, open, close } = usePhotoTour();
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const handleShareClick = () => {
    showToast('Share options');
  };

  const handleSaveClick = () => {
    const nextSavedState = !isSaved;
    setIsSaved(nextSavedState);
    showToast(nextSavedState ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  return (
    <>
      <ListingNavbar title={listing.title} />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <PropertyHeader
          listing={listing}
          isSaved={isSaved}
          onShareClick={handleShareClick}
          onSaveClick={handleSaveClick}
        />
        <HeroGallery
          listing={listing}
          onImageClick={open}
          onShowAllPhotosClick={open}
        />
        <ListingContent listing={listing} />
        <FooterSection listing={listing} />
      </main>

      {isOpen && (
        <PhotoTour
          listing={listing}
          initialImageId={initialImageId}
          onClose={close}
        />
      )}
    </>
  );
};
