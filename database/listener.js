"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientListener = void 0;
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importStar(require("../logger"));
function listener(pool) {
    pool.on('connect', (client) => {
        logger_1.default.info('Database connected, client:');
        logger_1.objLogger.debug(client);
    });
    pool.on('acquire', (client) => {
        logger_1.default.info('Database checked out client:');
        logger_1.objLogger.debug(client);
    });
    pool.on('error', (err, client) => {
        logger_1.default.error('An error ocurred in the DB');
        logger_1.objLogger.debug(client);
        logger_1.objLogger.error(err);
    });
    pool.on('remove', (client) => {
        logger_1.default.info('Database closed and removed client');
        logger_1.objLogger.debug(client);
    });
}
exports.default = listener;
function clientListener(client) {
    client.on('error', (err) => {
        logger_1.default.error('An error ocurred in the DB');
        logger_1.objLogger.error(err);
    });
}
exports.clientListener = clientListener;
