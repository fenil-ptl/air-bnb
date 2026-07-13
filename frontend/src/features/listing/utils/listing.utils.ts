import type { ListingData } from '../types/listing.types';

export const getPropertyMeta = (listing: ListingData): string =>
  `${listing.location.city}, ${listing.location.country}`;
