import type { ListingData } from '../types/listing.types';
import { AmenitiesSection } from './AmenitiesSection';
import { HostSection } from './HostSection';
import { MapSection } from './MapSection';
import { PropertyInformation } from './PropertyInformation';
import { ReviewsSection } from './ReviewsSection';
import { SleepingArrangement } from './SleepingArrangement';
import { StickyReservationCard } from './StickyReservationCard';

interface ListingContentProps {
  listing: ListingData;
}

export const ListingContent = ({ listing }: ListingContentProps) => {
  return (
    <section aria-label="Listing content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_360px] lg:gap-12">
        <article aria-label="Property content">
          <PropertyInformation listing={listing} />
          <AmenitiesSection listing={listing} />
          <SleepingArrangement listing={listing} />
          <ReviewsSection listing={listing} />
          <HostSection listing={listing} />
          <MapSection listing={listing} />
        </article>

        <div className="mt-8 lg:mt-0">
          <StickyReservationCard listing={listing} />
        </div>
      </div>
    </section>
  );
};
