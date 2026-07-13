import { Heart, Share, Star } from 'lucide-react';
import type { ListingData } from '../types/listing.types';
import { getPropertyMeta } from '../utils/listing.utils';

interface PropertyHeaderProps {
  listing: ListingData;
  isSaved: boolean;
  onShareClick: () => void;
  onSaveClick: () => void;
}

export const PropertyHeader = ({ listing, isSaved, onShareClick, onSaveClick }: PropertyHeaderProps) => {
  return (
    <header className="pt-6 pb-4">
      <div className="space-y-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="max-w-4xl text-[32px] font-semibold leading-10 tracking-tight text-neutral-800">
            {listing.title}
          </h1>

          <div className="flex items-center gap-x-1 self-start lg:self-auto">
            <button
              type="button"
              onClick={onShareClick}
              className="flex items-center gap-x-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition-colors duration-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2"
              aria-label="Share this listing"
            >
              <Share className="h-4 w-4 text-neutral-800" aria-hidden="true" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={onSaveClick}
              className="flex items-center gap-x-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition-colors duration-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2"
              aria-pressed={isSaved}
              aria-label={isSaved ? 'Remove this listing from wishlist' : 'Save this listing to wishlist'}
            >
              <Heart
                className={`h-4 w-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-neutral-800'}`}
                aria-hidden="true"
              />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-neutral-800">
          <span className="flex items-center gap-x-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-current text-neutral-800" aria-hidden="true" />
            <span>{listing.reviewSummary.averageRating.toFixed(2)}</span>
          </span>
          <span className="font-normal text-neutral-400" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            className="rounded px-0.5 font-semibold underline underline-offset-2 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2"
            aria-label={`Read all ${listing.reviewSummary.totalReviews} reviews`}
          >
            {listing.reviewSummary.totalReviews} reviews
          </button>
          <span className="font-normal text-neutral-400" aria-hidden="true">
            ·
          </span>
          <button
            type="button"
            className="rounded px-0.5 font-semibold underline underline-offset-2 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2"
            aria-label={`Show location on map: ${getPropertyMeta(listing)}`}
          >
            {getPropertyMeta(listing)}
          </button>
        </div>
      </div>
    </header>
  );
};
