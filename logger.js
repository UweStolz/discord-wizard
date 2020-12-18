"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objLogger = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [
        new winston_1.default.transports.Console(),
    ],
});
const objLogger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.prettyPrint({ colorize: true })),
    transports: [
        new winston_1.default.transports.Console(),
    ],
});
exports.objLogger = objLogger;
exports.default = logger;
