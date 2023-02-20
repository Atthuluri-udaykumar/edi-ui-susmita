import { AppServer } from './app-server';
import { logger } from './utils/winston.config';
const appServer = new AppServer();
const expressApp = appServer.getApp();

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM');

    appServer.shutdown();
});

process.on('SIGINT', () => {
    logger.info('Received SIGINT');

    appServer.shutdown();
});

process.on('uncaughtException', err => {
    logger.info('Uncaught exception');
    logger.error(err);

    appServer.shutdown(err);
});

export { expressApp };