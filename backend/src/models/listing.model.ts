import { model, Schema, type InferSchemaType } from 'mongoose';

import { AMENITY_CATEGORIES } from '../constants/amenity-category.constants';
import { IMAGE_CATEGORIES } from '../constants/image-category.constants';
import { LISTING_STATUSES, PROPERTY_TYPES } from '../constants/property.constants';

const imageSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    width: { type: Number, required: true, min: 1 },
    height: { type: Number, required: true, min: 1 },
    order: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: IMAGE_CATEGORIES },
    isHero: { type: Boolean, required: true, default: false },
  },
  { _id: false },
);

const amenityItemSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    available: { type: Boolean, required: true, default: true },
  },
  { _id: false },
);

const amenityGroupSchema = new Schema(
  {
    category: { type: String, required: true, enum: AMENITY_CATEGORIES },
    items: { type: [amenityItemSchema], default: [] },
  },
  { _id: false },
);

const bedSchema = new Schema(
  {
    type: { type: String, required: true, trim: true },
    count: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const roomSchema = new Schema(
  {
    roomName: { type: String, required: true, trim: true },
    beds: { type: [bedSchema], default: [] },
  },
  { _id: false },
);

const reviewSchema = new Schema(
  {
    reviewerName: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, required: true },
    comment: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const listingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    propertyType: { type: String, required: true, enum: PROPERTY_TYPES },
    maxGuests: { type: Number, required: true, min: 1 },
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    host: {
      name: { type: String, required: true, trim: true },
      avatar: { type: String, required: true, trim: true },
      isSuperhost: { type: Boolean, required: true, default: false },
      responseRate: { type: Number, required: true, min: 0, max: 100 },
      responseTime: { type: String, required: true, trim: true },
      joinedYear: { type: Number, required: true, min: 1900 },
    },
    pricing: {
      currency: { type: String, required: true, trim: true, uppercase: true, minlength: 3, maxlength: 3 },
      basePrice: { type: Number, required: true, min: 0 },
      cleaningFee: { type: Number, required: true, min: 0 },
      serviceFee: { type: Number, required: true, min: 0 },
      taxes: { type: Number, required: true, min: 0 },
      weeklyDiscountPercentage: { type: Number, min: 0, max: 100 },
      monthlyDiscountPercentage: { type: Number, min: 0, max: 100 },
    },
    images: { type: [imageSchema], default: [] },
    amenities: { type: [amenityGroupSchema], default: [] },
    rooms: { type: [roomSchema], default: [] },
    reviewSummary: {
      averageRating: { type: Number, required: true, min: 0, max: 5 },
      totalReviews: { type: Number, required: true, min: 0 },
    },
    reviews: { type: [reviewSchema], default: [] },
    propertyHighlights: {
      type: [
        new Schema(
          {
            title: { type: String, required: true, trim: true },
            description: { type: String, required: true, trim: true },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
    thingsToKnow: {
      houseRules: { type: [String], default: [] },
      safety: { type: [String], default: [] },
      cancellationPolicy: { type: [String], default: [] },
    },
    location: {
      city: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      latitude: { type: Number, required: true, min: -90, max: 90 },
      longitude: { type: Number, required: true, min: -180, max: 180 },
    },
    metadata: {
      status: { type: String, required: true, enum: LISTING_STATUSES, default: 'draft' },
      featured: { type: Boolean, required: true, default: false },
    },
    seo: {
      title: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      keywords: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
    collection: 'listings',
  },
);

listingSchema.index({ 'metadata.status': 1, 'metadata.featured': 1 });
listingSchema.index({ 'location.city': 1, 'location.country': 1 });
listingSchema.index({ 'reviewSummary.averageRating': -1 });

export type ListingDocument = InferSchemaType<typeof listingSchema>;

export const ListingModel = model<ListingDocument>('Listing', listingSchema);
