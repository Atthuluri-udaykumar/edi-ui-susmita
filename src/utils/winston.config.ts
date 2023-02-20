import httpContext from 'express-http-context';
import winston, { format } from 'winston';
import { ConsoleTransportOptions, FileTransportOptions } from 'winston/lib/winston/transports';
import { rootDir, contextPath } from './app.config';
import expressWinston from 'express-winston';
// import DailyRotateFile, { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

const fileOptions: FileTransportOptions = {
  level: 'info',
  filename: `${rootDir}/logs/app.log`,
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
};

const consoleOptions: ConsoleTransportOptions = {
  level: 'debug',
  handleExceptions: true,
};

// #### if daily rotation is required use with - npm install --save winston-daily-rotate-file ####
// let rotateOptions: DailyRotateFileTransportOptions = {
//   level: 'info',
//   filename: `${rootDir}/logs/appeal-service-%DATE%.log`,
//   datePattern: 'YYYY-MM-DD-HH',
//   handleExceptions: true,
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d'
// }
// let daylyRotateFile = new DailyRotateFile(rotateOptions);

const appName = contextPath.replace('/', '');

const transports: any[] = [new winston.transports.Console(consoleOptions)];

if (process.env.NODE_ENV !== 'test') {
  transports.push(new winston.transports.File(fileOptions));
}

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.printf((info) => {
      const trace = httpContext.get('traceId');
      let logFormat = `${info.timestamp} ${info.level} [${appName}, ${trace}] ${JSON.stringify(info.message)}`;
      if (info.meta) {
        logFormat = `${info.timestamp} ${info.level} [${appName}, ${trace}] org.zalando.logbook.Logbook ${JSON.stringify(info.meta)}`;
      }
      return logFormat;
    })),
  transports: transports,
  exitOnError: false, // do not exit on handled exceptions
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const ewLogger = expressWinston.logger({
  winstonInstance: logger,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  headerBlacklist: ["x-b3-parentspanid", "x-b3-sampled", "originalUrl"],
  ignoredRoutes: [contextPath + "/version"]
});

// Not used for now
// const errorLogger = expressWinston.errorLogger({
//   winstonInstance: logger,
//   format: winston.format.combine(
//     winston.format.colorize(),
//     winston.format.json()
//   )
// })

export { logger, ewLogger };
