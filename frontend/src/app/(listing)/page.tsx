'use client';

import { useListing } from '@/features/listing/hooks/useListing';
import { ListingContainer } from '@/features/listing/components/ListingContainer';

export default function ListingPage() {
  const { data: listing, isLoading, isError, error } = useListing();

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <p>Loading listing details...</p>
      </div>
    );
  }

  if (isError || !listing) {
    return (
      <div role="alert">
        <p>Error: {error instanceof Error ? error.message : 'Failed to load listing'}</p>
      </div>
    );
  }

  return <ListingContainer listing={listing} />;
}
