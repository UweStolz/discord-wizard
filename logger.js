"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objLogger = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const env_1 = require("./env");
const loggerLogLevel = env_1.logLevel || 'info';
const logLevels = {
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
winston_1.default.addColors(logLevels.colors);
const options = {
    level: loggerLogLevel,
    levels: logLevels.levels,
    transports: [
        new winston_1.default.transports.Console({ level: loggerLogLevel }),
    ],
    exitOnError: false,
};
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    ...options,
});
const objLogger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.prettyPrint({ colorize: true })),
    ...options,
});
exports.objLogger = objLogger;
exports.default = logger;
