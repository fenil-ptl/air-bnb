import type { Listing, Review } from '@airbnb-clone/shared';

import { LISTING_MESSAGES } from '../constants/listing.constants';
import type { ListingResponseDto } from '../dto/listing-response.dto';
import { ListingModel } from '../models/listing.model';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';

type PersistedListing = Omit<Listing, 'reviews' | 'createdAt' | 'updatedAt'> & {
  reviews: Array<Omit<Review, 'date'> & { date: Date }>;
  createdAt: Date;
  updatedAt: Date;
};

const mapListingToDto = (listingObject: PersistedListing): Listing => {
  const mappedReviews: Review[] = listingObject.reviews.map((review) => ({
    ...review,
    date: review.date.toISOString(),
  }));

  return {
    ...listingObject,
    reviews: mappedReviews,
    createdAt: listingObject.createdAt.toISOString(),
    updatedAt: listingObject.updatedAt.toISOString(),
  };
};

export const getListing = async (): Promise<ListingResponseDto> => {
  const listingDocument = await ListingModel.findOne().exec();

  if (!listingDocument) {
    throw new AppError(LISTING_MESSAGES.notFound, 404);
  }

  logger.info(LISTING_MESSAGES.fetchedSuccessfully);
  const listingObject = listingDocument.toObject() as PersistedListing;

  return {
    success: true,
    message: LISTING_MESSAGES.fetchedSuccessfully,
    data: mapListingToDto(listingObject),
  };
};
