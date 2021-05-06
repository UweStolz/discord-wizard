"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMember = exports.getMemberFromServer = exports.sendToVoiceChannel = void 0;
const tslib_1 = require("tslib");
const client_1 = require("../client");
const data_1 = require("../data");
const logger_1 = tslib_1.__importStar(require("../logger"));
async function sendToVoiceChannel(message, filePath) {
    if (message) {
        if (!message.guild)
            return;
        if (message.member?.voice.channel) {
            const connection = await message.member.voice.channel.join();
            logger_1.default.info(`Playing file: ${filePath}`);
            const dispatcher = connection.play(filePath);
            dispatcher.on('finish', () => {
                logger_1.default.info('Finished playing audio clip');
                dispatcher.destroy();
                connection.disconnect();
            });
            dispatcher.on('error', (err) => {
                logger_1.default.error('An error occurred while playing the audio clip!');
                logger_1.objLogger.error(err);
                connection.disconnect();
            });
        }
        else {
            message.channel.send('You need to join a voice channel first!');
        }
    }
}
exports.sendToVoiceChannel = sendToVoiceChannel;
async function getMemberFromServer() {
    const client = await client_1.getClient();
    let membersArr = null;
    const guild = client.guilds.cache.get(data_1.env.serverId);
    const members = guild?.members.cache;
    if (members) {
        membersArr = members.array();
    }
    return membersArr;
}
exports.getMemberFromServer = getMemberFromServer;
function validateMember(member, memberList) {
    const cleanMember = member.trim();
    const displayNameOfMember = cleanMember.startsWith('@') ? cleanMember.substr(1) : cleanMember;
    return memberList.find((m) => ((m.displayName === displayNameOfMember || m.nickname === displayNameOfMember)));
}
exports.validateMember = validateMember;
