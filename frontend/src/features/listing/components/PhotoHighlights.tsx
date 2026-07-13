import Image from 'next/image';
import type { ListingData } from '../types/listing.types';
import { getListingImageSrc } from '../utils/listing-image.utils';

interface PhotoHighlightsProps {
  listing: ListingData;
}

export const PhotoHighlights = ({ listing }: PhotoHighlightsProps) => {
  const images = [...listing.images].sort((a, b) => a.order - b.order).slice(0, 7);

  if (images.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="photo-highlights-heading" className="py-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">Spaces</p>
          <h2 id="photo-highlights-heading" className="mt-2 text-2xl font-semibold text-neutral-900">
            Highlighted spaces
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-neutral-600">
          A quick visual scan of the rooms and areas featured in this stay.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, index) => (
          <article
              key={image.id}
              className={`group relative overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm ${
                index === 0 ? 'sm:col-span-2 lg:row-span-2 min-h-[320px]' : 'min-h-[180px]'
              }`}
          >
            <Image
              src={getListingImageSrc(image)}
              alt={image.alt}
              fill
              sizes={index === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                {image.category.replace('-', ' ')}
              </p>
              <h3 className="mt-1 text-sm font-semibold leading-5">{image.alt}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
