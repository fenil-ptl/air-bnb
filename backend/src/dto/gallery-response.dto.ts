import type { Image } from '@airbnb-clone/shared';

export interface GalleryResponseDto {
  success: true;
  message: string;
  data: {
    images: Image[];
  };
}
