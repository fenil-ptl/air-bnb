import type { Request, Response } from 'express';

import { getListing } from '../services/listing.service';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

const getListingControllerHandler = async (
  req: Request,
  res: Response,
): Promise<unknown> => {
  void req;
  const listingResponse = await getListing();
  return ApiResponse.success(
    res,
    listingResponse.message,
    listingResponse.data,
  );
};

export const getListingController = asyncHandler(getListingControllerHandler);
