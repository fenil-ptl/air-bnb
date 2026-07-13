import type { AmenityGroup } from '@airbnb-clone/shared';

import type { ApiResponse } from '@/lib/axios';

export interface AmenitiesService {
  getAmenities(): Promise<ApiResponse<{ amenities: AmenityGroup[] }>>;
}
