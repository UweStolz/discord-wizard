"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const logger_1 = tslib_1.__importStar(require("../../logger"));
async function getSchemata() {
    const schemata = [];
    const schemataPath = `${path_1.resolve()}/database/schemata/queries`;
    try {
        const files = await fs_extra_1.readdir(schemataPath, { encoding: 'utf8' });
        // eslint-disable-next-line no-restricted-syntax
        for await (const file of files) {
            if (file.endsWith('.sql')) {
                const fileContent = await fs_extra_1.readFile(`${schemataPath}/${file}`, { encoding: 'utf8' });
                schemata.push(fileContent);
            }
        }
    }
    catch (err) {
        logger_1.default.error('Could not get schemata!');
        logger_1.objLogger.error(err);
    }
    return schemata;
}
exports.default = getSchemata;
