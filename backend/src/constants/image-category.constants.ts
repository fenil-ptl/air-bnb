export const IMAGE_CATEGORIES = [
  'exterior',
  'interior',
  'living-room',
  'bedroom',
  'bathroom',
  'kitchen',
  'workspace',
  'outdoor',
  'dining',
  'view',
] as const;

export type ImageCategory = (typeof IMAGE_CATEGORIES)[number];
