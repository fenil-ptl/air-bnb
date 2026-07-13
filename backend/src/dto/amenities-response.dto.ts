import type { AmenityGroup } from '@airbnb-clone/shared';

export interface AmenitiesResponseDto {
  success: true;
  message: string;
  data: {
    amenities: AmenityGroup[];
  };
}
