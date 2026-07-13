export type PropertyType =
  | 'entire-home'
  | 'private-room'
  | 'shared-room'
  | 'hotel-room';

export type ListingStatus = 'draft' | 'published' | 'archived';

export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  responseRate: number;
  responseTime: string;
  joinedYear: number;
}

export interface Pricing {
  currency: string;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  weeklyDiscountPercentage?: number;
  monthlyDiscountPercentage?: number;
}

export interface Image {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  order: number;
  category: string;
  isHero: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  icon: string;
  available: boolean;
}

export interface AmenityGroup {
  category: string;
  items: Amenity[];
}

export interface Bed {
  type: string;
  count: number;
}

export interface Room {
  roomName: string;
  beds: Bed[];
}

export interface Review {
  reviewerName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
}

export interface PropertyHighlights {
  title: string;
  description: string;
}

export interface ThingsToKnow {
  houseRules: string[];
  safety: string[];
  cancellationPolicy: string[];
}

export interface Location {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Metadata {
  status: ListingStatus;
  featured: boolean;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Listing {
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  host: Host;
  pricing: Pricing;
  images: Image[];
  amenities: AmenityGroup[];
  rooms: Room[];
  reviewSummary: ReviewSummary;
  reviews: Review[];
  propertyHighlights: PropertyHighlights[];
  thingsToKnow: ThingsToKnow;
  location: Location;
  metadata: Metadata;
  seo: Seo;
  createdAt?: string;
  updatedAt?: string;
}
