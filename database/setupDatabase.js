"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const pg_1 = require("./pg");
const data_1 = require("../data");
const listener_1 = tslib_1.__importStar(require("./listener"));
const initialization_1 = tslib_1.__importDefault(require("./initialization"));
const logger_1 = tslib_1.__importStar(require("../logger"));
let pool;
let client;
async function startDatabaseClient() {
    if (!pool) {
        pool = new pg_1.Pool({
            connectionString: data_1.env.databaseUrl,
            ssl: {
                rejectUnauthorized: false,
            },
        });
    }
    listener_1.default(pool);
}
async function getClient() {
    if (!client) {
        client = await pool.connect();
    }
    return client;
}
exports.getClient = getClient;
async function setupDatabase() {
    try {
        if (!data_1.env.disableDB) {
            logger_1.default.info('Start database initialization');
            await startDatabaseClient();
            if (!data_1.env.disableInitilizationOfDB) {
                await initialization_1.default();
            }
            client = await getClient();
            listener_1.clientListener(client);
        }
    }
    catch (err) {
        logger_1.default.error('Could not initialize database!');
        logger_1.objLogger.error(err);
    }
    return client;
}
exports.default = setupDatabase;
