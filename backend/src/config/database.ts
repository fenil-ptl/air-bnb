import mongoose from 'mongoose';

import { env } from './env';
import { logger } from '../utils/logger';

const mongooseOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
};

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connection established');
});

mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB connection disconnected');
});

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI, mongooseOptions);
  logger.info('MongoDB connected successfully');
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected');
};
