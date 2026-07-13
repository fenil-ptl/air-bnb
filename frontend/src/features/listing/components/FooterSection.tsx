import { MapPin, Tag } from 'lucide-react';
import type { ListingData } from '../types/listing.types';

interface FooterSectionProps {
  listing: ListingData;
}

export const FooterSection = ({ listing }: FooterSectionProps) => {
  return (
    <footer className="border-t border-neutral-200 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">About this stay</h2>
          <p className="mt-3 text-sm leading-7 text-neutral-700">{listing.seo.description}</p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Listing details
          </p>
          <div className="mt-4 space-y-3 text-sm text-neutral-700">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {listing.location.city}, {listing.location.country}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Tag className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{listing.seo.title}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {listing.seo.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-600"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
