import { ListingModel } from '../models/listing.model';
import { listingSeedData } from './listing.seed';

export const runListingSeed = async (): Promise<void> => {
  const existingListing = await ListingModel.findOne({ slug: listingSeedData.slug })
    .select('_id')
    .lean()
    .exec();

  if (existingListing) {
    return;
  }

  await ListingModel.create(listingSeedData);
};

export { listingSeedData };
