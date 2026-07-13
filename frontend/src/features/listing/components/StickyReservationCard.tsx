import type { ListingData } from '../types/listing.types';
import { BookingCard } from './BookingCard';

interface StickyReservationCardProps {
  listing: ListingData;
}

export const StickyReservationCard = ({ listing }: StickyReservationCardProps) => {
  return (
    <aside aria-label="Sticky reservation card" className="lg:sticky lg:top-24">
      <BookingCard listing={listing} />
    </aside>
  );
};
