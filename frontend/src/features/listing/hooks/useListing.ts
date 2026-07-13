import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';
import { getTyped } from '@/lib/axios';

import type { ListingData } from '../types/listing.types';

const LISTING_ENDPOINT = '/api/listing';

const fetchListing = async (): Promise<ListingData> => {
  const response = await getTyped<ListingData>(LISTING_ENDPOINT);
  if (!response.success) {
    throw new Error(response.message);
  }
  return response.data;
};

export const useListing = () =>
  useQuery({
    queryKey: QUERY_KEYS.listing,
    queryFn: fetchListing,
  });
