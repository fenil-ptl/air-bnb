import { createLogger, format, transports } from 'winston';

import { env } from '../config/env';

export const logger = createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      const base = `${timestamp} [${level}] ${message}`;
      return stack ? `${base}\n${stack}` : base;
    }),
  ),
  transports: [new transports.Console()],
});
