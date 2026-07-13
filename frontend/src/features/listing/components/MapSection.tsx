import { MapPin, Navigation2 } from 'lucide-react';
import type { ListingData } from '../types/listing.types';

interface MapSectionProps {
  listing: ListingData;
}

const buildMapEmbedUrl = (latitude: number, longitude: number): string =>
  `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

export const MapSection = ({ listing }: MapSectionProps) => {
  const { location } = listing;
  const embedUrl = buildMapEmbedUrl(location.latitude, location.longitude);

  return (
    <section aria-labelledby="map-heading" className="border-b border-neutral-200 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">Location</p>
          <h2 id="map-heading" className="mt-2 text-2xl font-semibold text-neutral-900">
            Where you’ll be staying
          </h2>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700 sm:inline-flex">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {location.city}, {location.country}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-100 shadow-sm">
          <iframe
            title={`${location.city}, ${location.country} map`}
            src={embedUrl}
            className="h-[380px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <article className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <Navigation2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">{location.city}, {location.country}</h3>
              <p className="mt-1 text-sm leading-7 text-neutral-600">
                Nestled near the coast with quick access to local cafes, quiet lanes, and beach views.
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Latitude</dt>
              <dd className="mt-2 text-base font-semibold text-neutral-900">{location.latitude.toFixed(4)}</dd>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Longitude</dt>
              <dd className="mt-2 text-base font-semibold text-neutral-900">{location.longitude.toFixed(4)}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-700 p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/65">Nearby vibe</p>
            <p className="mt-2 text-[15px] leading-7 text-white/90">
              Calm residential surroundings, easy rides to the shoreline, and enough privacy to feel like a retreat.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
