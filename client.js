"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discord = exports.loginClient = exports.getClient = exports.initializeClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = tslib_1.__importDefault(require("discord.js"));
exports.Discord = discord_js_1.default;
const data_1 = require("./data");
let client;
async function initializeClient() {
    client = new discord_js_1.default.Client();
}
exports.initializeClient = initializeClient;
async function getClient() {
    if (!client) {
        await initializeClient();
    }
    return client;
}
exports.getClient = getClient;
async function loginClient() {
    client.login(data_1.env.token);
}
exports.loginClient = loginClient;
