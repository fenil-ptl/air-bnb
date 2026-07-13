import app from './app';
import { connectDatabase, disconnectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';
import { runListingSeed } from './seed/seed';

let isShuttingDown = false;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    await runListingSeed();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server listening on port ${env.PORT}`);
    });

    const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
      if (isShuttingDown) {
        return;
      }
      isShuttingDown = true;

      logger.warn(`Received ${signal}. Starting graceful shutdown...`);

      server.close(async (closeError) => {
        if (closeError) {
          logger.error(`Error while closing HTTP server: ${closeError.message}`);
        } else {
          logger.info('HTTP server closed');
        }

        try {
          await disconnectDatabase();
          process.exit(closeError ? 1 : 0);
        } catch (disconnectError) {
          logger.error('Failed to disconnect MongoDB', { error: disconnectError });
          process.exit(1);
        }
      });
    };

    process.on('SIGINT', () => {
      void shutdown('SIGINT');
    });
    process.on('SIGTERM', () => {
      void shutdown('SIGTERM');
    });
  } catch (error) {
    logger.error('Server startup failed', { error });
    process.exit(1);
  }
};

void startServer();
