import winston from 'winston';
import { logLevel } from './env';

type LogLevels = 'error' | 'warn' | 'info' | 'debug' | 'trace';
const loggerLogLevel: LogLevels = (logLevel as LogLevels|undefined) || 'info';

const logLevels: winston.config.AbstractConfigSet = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'blue',
    debug: 'cyan',
  },
};
winston.addColors(logLevels.colors);

const options = {
  level: loggerLogLevel,
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({ level: loggerLogLevel }),
  ],
  exitOnError: false,
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  ...options,
});

const objLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.prettyPrint({ colorize: true }),
  ),
  ...options,
});

export default logger;

export { objLogger };
