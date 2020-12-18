"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const setupDatabase_1 = require("./setupDatabase");
const logger_1 = tslib_1.__importStar(require("../logger"));
async function query(queryStream) {
    let res = null;
    try {
        const connectedClient = await setupDatabase_1.getClient();
        res = await connectedClient.query(queryStream);
        logger_1.default.info('Query successfully executed:');
        logger_1.default.info(queryStream);
        logger_1.default.info(`Row count: ${res.rowCount}`);
        logger_1.objLogger.debug(res);
    }
    catch (err) {
        logger_1.default.error('An error ocurred while executing the query:');
        logger_1.default.error(queryStream);
        logger_1.objLogger.error(err);
    }
    return res;
}
exports.default = query;
