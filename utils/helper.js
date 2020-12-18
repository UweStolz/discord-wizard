"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomMagicConchAudioFile = exports.getRandomNumberInRange = exports.getHelpMessage = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const data_1 = require("../data");
const magicConchAudioFiles = [];
let helpMessage = '';
function getHelpMessage() {
    if (helpMessage.length === 0) {
        const descriptions = Object.values(data_1.commands);
        Object.keys(data_1.commands).forEach((command, index) => {
            helpMessage += `${command}: ${descriptions[index]} \n`;
        });
    }
    return helpMessage;
}
exports.getHelpMessage = getHelpMessage;
function getRandomNumberInRange(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
}
exports.getRandomNumberInRange = getRandomNumberInRange;
function getRandomMagicConchAudioFile() {
    if (magicConchAudioFiles.length === 0) {
        const rootDir = path_1.resolve();
        const audioFilesDir = `${rootDir}/assets/audio/magicConch`;
        fs_1.readdirSync(audioFilesDir).forEach((path) => {
            magicConchAudioFiles.push(`${audioFilesDir}/${path}`);
        });
    }
    const randomNumber = getRandomNumberInRange(0, magicConchAudioFiles.length - 1);
    const randomFile = magicConchAudioFiles[randomNumber];
    return randomFile;
}
exports.getRandomMagicConchAudioFile = getRandomMagicConchAudioFile;
