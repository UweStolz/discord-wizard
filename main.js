"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("./logger"));
const client_1 = require("./client");
const data_1 = require("./data");
const handler_1 = tslib_1.__importDefault(require("./handler"));
const parser_1 = tslib_1.__importDefault(require("./parser"));
if (!data_1.env.disableDB) {
    // eslint-disable-next-line global-require
    require('./database');
}
let client;
function startListener() {
    client.on('message', async (message) => {
        const { command, argument } = parser_1.default(message.content);
        if (command) {
            logger_1.default.info(`Command: ${command}`);
            if (argument) {
                logger_1.default.info(`Argument: ${argument}`);
            }
            await handler_1.default(command, message, argument);
        }
    });
}
async function main() {
    await client_1.initializeClient();
    client = await client_1.getClient();
    client.on('ready', () => {
        logger_1.default.info('Application ready');
        logger_1.default.info('Starting listener..');
        startListener();
    });
    await client_1.loginClient();
}
exports.default = main;
