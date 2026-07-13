import type { Image as ListingImage } from '@airbnb-clone/shared';

export const getListingImageSrc = (image: ListingImage): string => {
  const paddedOrder = String(image.order).padStart(2, '0');
  return `/listing/listing-${paddedOrder}.jpeg`;
};
