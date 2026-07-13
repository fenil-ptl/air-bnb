import type { Review, ReviewSummary } from '@airbnb-clone/shared';

import type { ApiResponse } from '@/lib/axios';

export interface ReviewsService {
  getReviews(): Promise<
    ApiResponse<{
      reviewSummary: ReviewSummary;
      reviews: Review[];
    }>
  >;
}
