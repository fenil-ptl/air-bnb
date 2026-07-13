import type { ErrorRequestHandler } from 'express';

import { env } from '../config/env';
import { AppError } from '../utils/app-error';
import { ApiResponse } from '../utils/api-response';
import { logger } from '../utils/logger';

export const globalErrorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  next,
) => {
  void next;
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : 'Internal server error';

  if (!isAppError) {
    logger.error(err instanceof Error ? err.message : 'Unknown error', {
      error: err,
    });
  }

  const errorDetails =
    env.NODE_ENV === 'production'
      ? undefined
      : err instanceof Error
        ? err.stack
        : err;

  ApiResponse.error(res, message, statusCode, errorDetails);
};
