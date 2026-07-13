import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';
import type { Image as ListingImage } from '@airbnb-clone/shared';
import type { ListingData } from '../types/listing.types';
import { getListingImageSrc } from '../utils/listing-image.utils';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface HeroGalleryProps {
  listing: ListingData;
  /** Prepared for Photo Tour — called with the image id when a cell is clicked. */
  onImageClick?: (imageId: string) => void;
  /** Prepared for Photo Tour full-screen gallery. */
  onShowAllPhotosClick?: () => void;
}

interface GalleryCellProps {
  image: ListingImage;
  priority: boolean;
  sizes: string;
  onClick?: (imageId: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// GalleryCell — single reusable image cell
// ---------------------------------------------------------------------------

const GalleryCell = ({
  image,
  priority,
  sizes,
  onClick,
  className = '',
}: GalleryCellProps) => (
  <button
    type="button"
    className={`group relative h-full w-full cursor-pointer overflow-hidden bg-neutral-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 ${className}`}
    data-gallery-cell
    aria-label={image.alt}
    onClick={() => onClick?.(image.id)}
  >
    <Image
      src={getListingImageSrc(image)}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-90"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
  </button>
);

// ---------------------------------------------------------------------------
// HeroGallery
// ---------------------------------------------------------------------------

export const HeroGallery = ({
  listing,
  onImageClick,
  onShowAllPhotosClick,
}: HeroGalleryProps) => {
  const images = [...listing.images].sort((a, b) => a.order - b.order);
  const heroImage = images.find((image) => image.isHero) ?? images[0];
  const secondaryImages = images
    .filter((image) => image.id !== heroImage.id)
    .slice(0, 4);

  if (!heroImage) {
    return null;
  }

  return (
    <section aria-label="Photo gallery" className="relative">
      <h2 className="sr-only">Photo gallery</h2>

      <div
        className="grid h-[560px] w-full gap-0.5 overflow-hidden rounded-2xl lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        role="list"
        aria-label="Listing photos"
      >
        <GalleryCell
          image={heroImage}
          priority
          sizes="(max-width: 1280px) 60vw, 720px"
          className="h-full"
          onClick={onImageClick}
        />

        <div className="grid h-full grid-cols-2 grid-rows-2 gap-0.5">
          {secondaryImages.map((image) => (
            <GalleryCell
              key={image.id}
              image={image}
              priority={false}
              sizes="(max-width: 1280px) 25vw, 240px"
              className="h-full"
              onClick={onImageClick}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <button
          type="button"
          onClick={onShowAllPhotosClick}
          aria-label={`Show all ${listing.images.length} photos`}
          className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 transition-colors duration-150 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2"
        >
          <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          Show all photos
        </button>
      </div>
    </section>
  );
};
