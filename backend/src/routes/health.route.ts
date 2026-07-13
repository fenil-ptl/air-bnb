import { Router } from 'express';

import { ApiResponse } from '../utils/api-response';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  return ApiResponse.success(res, 'Server is healthy');
});
