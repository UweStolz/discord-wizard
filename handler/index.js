"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const handlers_1 = tslib_1.__importDefault(require("./handlers"));
const utils_1 = tslib_1.__importDefault(require("../utils"));
const data_1 = require("../data");
const logger_1 = tslib_1.__importDefault(require("../logger"));
async function handleCommand(command, message, ...args) {
    try {
        const func = handlers_1.default[command];
        if (func) {
            await func(message, ...args);
            if (!data_1.env.disableDB) {
                await utils_1.default.dbHelper.updateStatForColumn(command);
            }
        }
        else {
            await handlers_1.default.defaultHandler(message);
        }
    }
    catch (err) {
        logger_1.default.error('An error occured!');
        logger_1.default.error(err);
    }
}
exports.default = handleCommand;
