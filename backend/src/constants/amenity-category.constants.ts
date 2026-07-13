export const AMENITY_CATEGORIES = [
  'guest-favorite',
  'bathroom',
  'kitchen',
  'outdoor',
  'workspace',
  'essentials',
  'safety',
] as const;

export type AmenityCategory = (typeof AMENITY_CATEGORIES)[number];
