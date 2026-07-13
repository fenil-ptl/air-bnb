import { z } from 'zod';

import { listingSchema } from './listing.schema';

export const listingResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: listingSchema,
});

export const galleryResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    images: listingSchema.shape.images,
  }),
});

export const reviewResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    reviewSummary: listingSchema.shape.reviewSummary,
    reviews: listingSchema.shape.reviews,
  }),
});

export const amenitiesResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    amenities: listingSchema.shape.amenities,
  }),
});
