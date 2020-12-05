import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const objLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.prettyPrint({ colorize: true }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;

export { objLogger };
