import { z } from 'zod';

import { AMENITY_CATEGORIES } from '../constants/amenity-category.constants';
import { IMAGE_CATEGORIES } from '../constants/image-category.constants';
import { LISTING_STATUSES, PROPERTY_TYPES } from '../constants/property.constants';

const imageSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  order: z.number().int().min(0),
  category: z.enum(IMAGE_CATEGORIES),
  isHero: z.boolean(),
});

const amenitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  icon: z.string().min(1),
  available: z.boolean(),
});

const amenityGroupSchema = z.object({
  category: z.enum(AMENITY_CATEGORIES),
  items: z.array(amenitySchema),
});

const bedSchema = z.object({
  type: z.string().min(1),
  count: z.number().int().min(1),
});

const roomSchema = z.object({
  roomName: z.string().min(1),
  beds: z.array(bedSchema),
});

const reviewSchema = z.object({
  reviewerName: z.string().min(1),
  avatar: z.string().url(),
  rating: z.number().min(1).max(5),
  date: z.string().datetime(),
  comment: z.string().min(1),
});

export const listingSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  propertyType: z.enum(PROPERTY_TYPES),
  maxGuests: z.number().int().min(1),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  host: z.object({
    name: z.string().min(1),
    avatar: z.string().url(),
    isSuperhost: z.boolean(),
    responseRate: z.number().min(0).max(100),
    responseTime: z.string().min(1),
    joinedYear: z.number().int().min(1900),
  }),
  pricing: z.object({
    currency: z.string().length(3),
    basePrice: z.number().min(0),
    cleaningFee: z.number().min(0),
    serviceFee: z.number().min(0),
    taxes: z.number().min(0),
    weeklyDiscountPercentage: z.number().min(0).max(100).optional(),
    monthlyDiscountPercentage: z.number().min(0).max(100).optional(),
  }),
  images: z.array(imageSchema),
  amenities: z.array(amenityGroupSchema),
  rooms: z.array(roomSchema),
  reviewSummary: z.object({
    averageRating: z.number().min(0).max(5),
    totalReviews: z.number().int().min(0),
  }),
  reviews: z.array(reviewSchema),
  propertyHighlights: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
  thingsToKnow: z.object({
    houseRules: z.array(z.string().min(1)),
    safety: z.array(z.string().min(1)),
    cancellationPolicy: z.array(z.string().min(1)),
  }),
  location: z.object({
    city: z.string().min(1),
    country: z.string().min(1),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  metadata: z.object({
    status: z.enum(LISTING_STATUSES),
    featured: z.boolean(),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    keywords: z.array(z.string().min(1)),
  }),
});

export type ListingSchemaType = z.infer<typeof listingSchema>;
