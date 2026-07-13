import type { Review, ReviewSummary } from '@airbnb-clone/shared';

export interface ReviewResponseDto {
  success: true;
  message: string;
  data: {
    reviewSummary: ReviewSummary;
    reviews: Review[];
  };
}
