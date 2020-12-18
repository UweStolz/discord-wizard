"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const commandPrefix = data_1.env.commandPrefix || '/wizard';
const commandPrefixAlias = data_1.env.commandPrefixAlias || '/w';
function parser(input) {
    const parsedInput = {
        command: null,
        argument: null,
    };
    const cleanInput = input.trim();
    const isValidCommand = (cleanInput.startsWith(commandPrefix) || cleanInput.startsWith(commandPrefixAlias));
    if (isValidCommand) {
        const words = input.split(' ');
        parsedInput.command = words.length > 0 ? words[1] : null;
        parsedInput.argument = words.length > 1 ? words[2] : null;
    }
    return parsedInput;
}
exports.default = parser;
