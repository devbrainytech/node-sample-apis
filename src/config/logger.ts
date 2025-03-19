import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Logger Configuration
 * Sets up application-wide logging functionality
 */

const { combine, timestamp, printf, colorize } = winston.format;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const transports = [];

/**
 * Adds console transport for development environment
 */
if (process.env['NODE_ENV'] === 'production') {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info', // Log level for file transport in production
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
      level: 'debug', // Log level for console in development
    })
  );
}

/**
 * Logger instance configuration
 * Defines log levels, formats, and transports
 */
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(timestamp(), logFormat),
  transports,
});

/**
 * Logs server startup information
 * @param port Server port number
 * @returns Promise<void>
 */
export const logServerStartup = async (port: number) => {
  try {
    logger.info(`Server started on port ${port}`);
  } catch (error) {
    logger.error('Error during server startup logging:', error);
  }
};

/**
 * Logs database sync status
 * @returns Promise<void>
 */
export const logDatabaseSync = async () => {
  try {
    logger.info('Database synced successfully.');
  } catch (error) {
    logger.error('Error during database sync:', error);
  }
};

/**
 * Logs server start error
 * @param error Error object
 * @returns Promise<void>
 */
export const logServerStartError = (error: any) => {
  logger.error('Unable to start server:', error);
};

export default logger;
