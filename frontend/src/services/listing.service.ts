import type { Listing } from '@airbnb-clone/shared';

import type { ApiResponse } from '@/lib/axios';

export interface ListingService {
  getListing(): Promise<ApiResponse<Listing>>;
}
