import type { Image } from '@airbnb-clone/shared';

import type { ApiResponse } from '@/lib/axios';

export interface GalleryService {
  getGallery(): Promise<ApiResponse<{ images: Image[] }>>;
}
