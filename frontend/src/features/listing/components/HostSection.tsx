import Image from 'next/image';
import { Clock3, ShieldCheck, Sparkles } from 'lucide-react';
import type { ListingData } from '../types/listing.types';

interface HostSectionProps {
  listing: ListingData;
}

export const HostSection = ({ listing }: HostSectionProps) => {
  return (
    <section aria-labelledby="host-heading" className="py-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-2xl border border-neutral-200 p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-neutral-100">
              <Image
                src={listing.host.avatar}
                alt={`${listing.host.name} avatar`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 id="host-heading" className="text-2xl font-semibold text-neutral-900">
                Hosted by {listing.host.name}
              </h2>
              <p className="mt-1 text-sm text-neutral-600">Joined in {listing.host.joinedYear}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-900">
                {listing.host.isSuperhost ? 'Superhost' : 'Experienced host'}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {listing.host.isSuperhost ? 'Top-rated host' : 'Trusted host'}
              </p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-900">Response rate</p>
              <p className="mt-1 text-sm text-neutral-600">{listing.host.responseRate}%</p>
            </div>
            <div className="rounded-xl bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-900">Response time</p>
              <p className="mt-1 text-sm text-neutral-600">{listing.host.responseTime}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-xl font-semibold text-neutral-900">Things to know</h3>
          <div className="mt-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                House rules
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-neutral-700">
                {listing.thingsToKnow.houseRules.map((rule) => (
                  <li key={rule}>• {rule}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Safety
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-neutral-700">
                {listing.thingsToKnow.safety.map((safetyItem) => (
                  <li key={safetyItem}>• {safetyItem}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                Cancellation policy
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-neutral-700">
                {listing.thingsToKnow.cancellationPolicy.map((policy) => (
                  <li key={policy}>• {policy}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
