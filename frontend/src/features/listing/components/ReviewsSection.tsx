import Image from 'next/image';
import { Star } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import type { ListingData } from '../types/listing.types';

interface ReviewsSectionProps {
  listing: ListingData;
}

export const ReviewsSection = ({ listing }: ReviewsSectionProps) => {
  const { reviewSummary, reviews } = listing;

  return (
    <section aria-labelledby="reviews-heading" className="border-b border-neutral-200 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 id="reviews-heading" className="text-2xl font-semibold text-neutral-900">
              Reviews
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-700">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              {reviewSummary.averageRating.toFixed(2)}
            </span>
          </div>
          <p className="mt-2 text-sm text-neutral-600">
            {reviewSummary.totalReviews} guest reviews
          </p>
        </div>
        <p className="text-sm text-neutral-500">Verified stays and recent feedback</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl border border-neutral-200 p-6">
          <p className="text-5xl font-semibold text-neutral-900">
            {reviewSummary.averageRating.toFixed(1)}
          </p>
          <div className="mt-3 flex items-center gap-1" aria-label={`Rated ${reviewSummary.averageRating.toFixed(2)} out of 5`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={`${reviewSummary.averageRating}-${index}`}
                className={`h-4 w-4 ${
                  index < Math.round(reviewSummary.averageRating) ? 'fill-current text-neutral-900' : 'text-neutral-300'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Based on {reviewSummary.totalReviews} guest reviews from recent stays.
          </p>
        </div>

        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={`${review.reviewerName}-${review.date}`}>
              <article className="rounded-2xl border border-neutral-200 p-5">
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-neutral-100">
                    <Image
                      src={review.avatar}
                      alt={`${review.reviewerName} avatar`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-neutral-900">{review.reviewerName}</h3>
                      <span className="text-sm text-neutral-500">{formatDate(review.date)}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={`${review.reviewerName}-${review.date}-${index}`}
                          className={`h-4 w-4 ${index < review.rating ? 'fill-current text-neutral-900' : 'text-neutral-300'}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-neutral-700">{review.comment}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
