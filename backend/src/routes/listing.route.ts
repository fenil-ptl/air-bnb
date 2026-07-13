import { Router } from 'express';

import { getListingController } from '../controllers/listing.controller';

export const listingRouter = Router();

listingRouter.get('/', getListingController);
