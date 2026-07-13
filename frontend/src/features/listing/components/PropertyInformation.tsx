import { Bath, BedDouble, Home, Sparkles, Users } from 'lucide-react';
import type { ListingData } from '../types/listing.types';

interface PropertyInformationProps {
  listing: ListingData;
}

const formatPropertyType = (propertyType: ListingData['propertyType']): string => {
  switch (propertyType) {
    case 'entire-home':
      return 'Entire home';
    case 'private-room':
      return 'Private room';
    case 'shared-room':
      return 'Shared room';
    case 'hotel-room':
      return 'Hotel room';
    default:
      return propertyType;
  }
};

export const PropertyInformation = ({ listing }: PropertyInformationProps) => {
  return (
    <section aria-labelledby="property-information-heading" className="border-b border-neutral-200 py-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-600">
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>{formatPropertyType(listing.propertyType)}</span>
          </div>
          <p className="max-w-3xl text-[17px] leading-8 text-neutral-700">
            {listing.description}
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center gap-3 text-neutral-800">
              <Users className="h-5 w-5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Guests</p>
                <p className="text-sm text-neutral-600">Up to {listing.maxGuests}</p>
              </div>
            </div>
          </li>
          <li className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center gap-3 text-neutral-800">
              <BedDouble className="h-5 w-5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Bedrooms</p>
                <p className="text-sm text-neutral-600">{listing.bedrooms}</p>
              </div>
            </div>
          </li>
          <li className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center gap-3 text-neutral-800">
              <Bath className="h-5 w-5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Bathrooms</p>
                <p className="text-sm text-neutral-600">{listing.bathrooms}</p>
              </div>
            </div>
          </li>
          <li className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center gap-3 text-neutral-800">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Location</p>
                <p className="text-sm text-neutral-600">
                  {listing.location.city}, {listing.location.country}
                </p>
              </div>
            </div>
          </li>
        </ul>

        <article className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900">Highlights</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {listing.propertyHighlights.map((highlight) => (
              <li key={highlight.title} className="space-y-1">
                <h4 className="font-semibold text-neutral-800">{highlight.title}</h4>
                <p className="text-sm leading-7 text-neutral-600">{highlight.description}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};
