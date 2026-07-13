import type { Listing } from '@airbnb-clone/shared';

export interface ListingResponseDto {
  success: true;
  message: string;
  data: Listing;
}
