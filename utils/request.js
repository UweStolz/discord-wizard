"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = tslib_1.__importDefault(require("axios"));
const logger_1 = tslib_1.__importStar(require("../logger"));
function getResponseData(response) {
    let data = null;
    if (response?.status === 200) {
        data = response.data;
    }
    return data;
}
async function GET(url, options) {
    const response = await axios_1.default.get(url, options);
    return getResponseData(response);
}
async function POST(url, options) {
    const response = await axios_1.default.post(url, options);
    return getResponseData(response);
}
async function request(type, url, options = undefined) {
    let response = null;
    try {
        switch (type) {
            case 'GET':
                response = await GET(url, options);
                break;
            case 'POST':
                response = await POST(url, options);
                break;
            default:
                logger_1.default.warn('No matching request method found!');
                break;
        }
    }
    catch (err) {
        logger_1.default.error('An error ocurred while making a request!');
        logger_1.objLogger.error(err);
    }
    return response;
}
exports.default = request;
