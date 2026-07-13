import { BedDouble } from 'lucide-react';
import type { ListingData } from '../types/listing.types';

interface SleepingArrangementProps {
  listing: ListingData;
}

const formatBedLabel = (bedType: string, count: number): string => {
  const singularLabel = bedType
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

  return `${count} ${singularLabel}${count > 1 ? 's' : ''}`;
};

export const SleepingArrangement = ({ listing }: SleepingArrangementProps) => {
  return (
    <section aria-labelledby="sleeping-arrangement-heading" className="border-b border-neutral-200 py-10">
      <h2 id="sleeping-arrangement-heading" className="text-2xl font-semibold text-neutral-900">
        Where you&apos;ll sleep
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {listing.rooms.map((room) => (
          <article key={room.roomName} className="rounded-2xl border border-neutral-200 p-5">
            <div className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-neutral-700" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-neutral-900">{room.roomName}</h3>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              {room.beds.map((bed) => (
                <li
                  key={`${room.roomName}-${bed.type}`}
                  className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2"
                >
                  <span>{formatBedLabel(bed.type, bed.count)}</span>
                  <span className="text-neutral-500">{bed.count > 1 ? 'Beds' : 'Bed'}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
