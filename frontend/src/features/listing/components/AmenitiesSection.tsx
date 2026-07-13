import {
  Armchair,
  Bath,
  Car,
  Coffee,
  CookingPot,
  Sparkles,
  Waves,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import type { ListingData } from '../types/listing.types';

interface AmenitiesSectionProps {
  listing: ListingData;
}

const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  coffee: Coffee,
  kitchen: CookingPot,
  parking: Car,
  bathtub: Bath,
  lounge: Armchair,
};

const formatCategoryLabel = (category: string): string =>
  category
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

export const AmenitiesSection = ({ listing }: AmenitiesSectionProps) => {
  const availableCount = listing.amenities.flatMap((group) => group.items).filter((item) => item.available).length;

  return (
    <section aria-labelledby="amenities-heading" className="border-b border-neutral-200 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="amenities-heading" className="text-2xl font-semibold text-neutral-900">
            What this place offers
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            {availableCount} amenities available
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {listing.amenities.map((group) => (
          <article key={group.category} className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              {formatCategoryLabel(group.category)}
            </h3>
            <ul className="space-y-3">
              {group.items.map((amenity) => {
                const Icon = iconMap[amenity.icon] ?? Sparkles;

                return (
                  <li
                    key={amenity.id}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                      amenity.available ? 'border-neutral-200 text-neutral-700' : 'border-neutral-100 bg-neutral-50 text-neutral-400'
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 font-medium">{amenity.title}</span>
                    {!amenity.available && (
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        Unavailable
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
