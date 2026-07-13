import type { NextFunction, Request, Response } from 'express';

import { logger } from '../utils/logger';

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs.toFixed(2)}ms`,
    );
  });

  next();
};
