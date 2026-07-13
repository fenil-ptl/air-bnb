import { ArrowRight, Star } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import type { ListingData } from '../types/listing.types';

interface BookingCardProps {
  listing: ListingData;
}

export const BookingCard = ({ listing }: BookingCardProps) => {
  const { pricing, reviewSummary } = listing;
  const totalBeforeTaxes = pricing.basePrice + pricing.cleaningFee + pricing.serviceFee + pricing.taxes;

  return (
    <article
      aria-label="Reservation details"
      className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      <div className="border-b border-neutral-200 bg-gradient-to-br from-rose-50 via-white to-neutral-50 px-6 py-5">
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold tracking-tight text-neutral-900">
              {formatCurrency(pricing.basePrice, pricing.currency)}
            </span>
            <span className="text-base text-neutral-600">night</span>
          </div>
          <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-600 shadow-sm">
            Instant book
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
          <span className="flex items-center gap-1 font-semibold">
            <Star className="h-4 w-4 fill-current" aria-hidden="true" />
            {reviewSummary.averageRating.toFixed(2)}
          </span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            className="font-medium text-neutral-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2"
            aria-label={`Read all ${reviewSummary.totalReviews} reviews`}
          >
            {reviewSummary.totalReviews} reviews
          </button>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-neutral-200 bg-neutral-50 p-3">
          <button
            type="button"
            className="rounded-2xl bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            aria-label="Select check in date"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Check in</p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">Jan 12, 2026</p>
          </button>
          <button
            type="button"
            className="rounded-2xl bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            aria-label="Select check out date"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Check out</p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">Jan 17, 2026</p>
          </button>
        </div>

        <div className="mt-4 rounded-[24px] border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">Calendar</p>
              <h3 className="mt-1 text-base font-semibold text-neutral-900">Choose your dates</h3>
            </div>
            <button
              type="button"
              className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-200"
              aria-label="Open full calendar"
            >
              Open calendar
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-neutral-500">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, index) => {
              const selected = index >= 18 && index <= 22;
              const occupied = index < 5 || index === 30 || index === 31;

              return (
                <button
                  key={`calendar-cell-${index}`}
                  type="button"
                  className={`flex h-11 items-center justify-center rounded-xl text-sm font-medium transition ${
                    selected
                      ? 'bg-neutral-900 text-white'
                      : occupied
                        ? 'cursor-not-allowed bg-neutral-100 text-neutral-300'
                        : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                  }`}
                  aria-label={`Calendar day ${index + 1}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          aria-label="Reserve this listing"
        >
          Reserve
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>

        <dl className="mt-6 space-y-3 text-sm text-neutral-600">
          <div className="flex items-center justify-between">
            <dt>Cleaning fee</dt>
            <dd>{formatCurrency(pricing.cleaningFee, pricing.currency)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Service fee</dt>
            <dd>{formatCurrency(pricing.serviceFee, pricing.currency)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Taxes</dt>
            <dd>{formatCurrency(pricing.taxes, pricing.currency)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4 text-base font-semibold text-neutral-900">
          <dt>Total before taxes</dt>
          <dd>{formatCurrency(totalBeforeTaxes, pricing.currency)}</dd>
        </div>
      </div>
    </article>
  );
};
