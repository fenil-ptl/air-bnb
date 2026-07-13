import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env';
import { LISTING_ROUTE_PATH } from './constants/listing.constants';
import { globalErrorMiddleware } from './middleware/error.middleware';
import { notFoundMiddleware } from './middleware/not-found.middleware';
import { requestLoggerMiddleware } from './middleware/request-logger.middleware';
import { healthRouter } from './routes/health.route';
import { listingRouter } from './routes/listing.route';

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(requestLoggerMiddleware);

app.use('/health', healthRouter);
app.use(LISTING_ROUTE_PATH, listingRouter);

app.use(notFoundMiddleware);
app.use(globalErrorMiddleware);

export default app;
