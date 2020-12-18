"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("../../logger"));
const schemata_1 = tslib_1.__importDefault(require("../schemata"));
const query_1 = tslib_1.__importDefault(require("../query"));
async function initilization() {
    logger_1.default.info('Getting schemata');
    const schemata = await schemata_1.default();
    logger_1.default.info('Start initializing schemata');
    const schemataCount = schemata.length;
    if (schemataCount > 0) {
        let count = 1;
        // eslint-disable-next-line no-restricted-syntax
        for await (const q of schemata) {
            logger_1.default.info(`Initialize schema ${count}/${schemataCount}:`);
            await query_1.default(q);
            count += 1;
        }
        logger_1.default.info('Schemata successfully initialized');
    }
}
exports.default = initilization;
