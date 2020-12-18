"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("../client");
const utils_1 = tslib_1.__importDefault(require("../utils"));
const data_1 = require("../data");
const logger_1 = tslib_1.__importDefault(require("../logger"));
async function stats(message) {
    if (!data_1.env.disableDB) {
        const embed = new client_1.Discord.MessageEmbed();
        const chart = await utils_1.default.dbHelper.getStatistics();
        if (chart) {
            const attachment = new client_1.Discord.MessageAttachment(chart);
            embed.attachFiles([attachment]);
            await message.channel.send(embed);
        }
    }
    else {
        await message.channel.send('Could not get statistics, the DB is disabled!');
    }
}
async function help(message) {
    const helpMessage = utils_1.default.helper.getHelpMessage();
    const embed = new client_1.Discord.MessageEmbed({
        title: 'Helpful help, that really helps...probably',
        description: helpMessage,
    });
    await message.channel.send(embed);
}
async function ping(message) {
    await message.channel.send('pong');
}
async function cat(message, argument) {
    if (argument) {
        if (argument === 'fact') {
            const { fact } = await utils_1.default.helper.request('GET', data_1.publicApis.catFact, undefined);
            if (fact) {
                await message.channel.send(`FACT: "${fact}"`);
            }
        }
        else if (argument === 'pic') {
            const { file } = await utils_1.default.helper.request('GET', data_1.publicApis.catPic, undefined);
            if (file) {
                await message.channel.send(file);
            }
        }
    }
}
async function quote(message) {
    const quoteApiCount = data_1.publicApis.quotes.length;
    const randomNumber = utils_1.default.helper.getRandomNumberInRange(0, quoteApiCount - 1);
    const requestedQuote = await utils_1.default.helper.request('GET', data_1.publicApis.quotes[1].url, undefined);
    if ((Array.isArray(requestedQuote) && requestedQuote.length > 0)
        || (requestedQuote.constructor === Object && Object.keys(requestedQuote).length > 0)) {
        const quoteText = data_1.publicApis.quotes[randomNumber].response(requestedQuote);
        await message.channel.send(`Quote: "${quoteText}"`);
    }
}
async function insult(message, argument = null) {
    const insultToMember = await utils_1.default.helper.request('GET', data_1.publicApis.insult, undefined) || null;
    const allMembers = await utils_1.default.discordHelper.getMemberFromServer();
    if (insultToMember && allMembers) {
        const members = allMembers === null || allMembers === void 0 ? void 0 : allMembers.filter((m) => (m.displayName !== 'wizard'));
        const utf8ConvertedInsult = Buffer.from(insultToMember.insult).toString();
        let member;
        if (argument) {
            const validatedMember = utils_1.default.discordHelper.validateMember(argument, members);
            if (validatedMember) {
                member = validatedMember;
            }
            else {
                logger_1.default.warn('Member not in list');
                return;
            }
        }
        else if ((members.length) === 1) {
            // eslint-disable-next-line prefer-destructuring
            member = members[0];
        }
        else {
            const randomNumber = utils_1.default.helper.getRandomNumberInRange(1, members.length - 1);
            member = members[randomNumber];
        }
        await message.channel.send(`${member} ${utf8ConvertedInsult}`);
    }
}
async function bored(message) {
    const { activity } = await utils_1.default.helper.request('GET', data_1.publicApis.bored, undefined) || null;
    if (activity) {
        await message.channel.send(`How about..? - ${activity}`);
    }
}
async function whatIs(message, argument = null) {
    var _a, _b, _c, _d;
    const owlBotResponse = await utils_1.default.helper.request('GET', `${data_1.publicApis.owlbot}${argument}`, {
        headers: {
            Authorization: `Token ${data_1.env.owlBotToken}`,
        },
    });
    if (owlBotResponse) {
        const definitionObj = owlBotResponse.definitions[0];
        const emoji = definitionObj === null || definitionObj === void 0 ? void 0 : definitionObj.emoji;
        let wordDescription = '';
        wordDescription += ((_a = definitionObj.definition) === null || _a === void 0 ? void 0 : _a.length) > 0 ? `Definition: ${definitionObj.definition} ${emoji || ''}\n` : '';
        wordDescription += ((_b = definitionObj.type) === null || _b === void 0 ? void 0 : _b.length) > 0 ? `Type: ${definitionObj.type}\n` : '';
        wordDescription += ((_c = definitionObj.example) === null || _c === void 0 ? void 0 : _c.length) > 0 ? `Example: ${definitionObj.example}\n` : '';
        const embed = new client_1.Discord.MessageEmbed({
            title: owlBotResponse.word,
            description: wordDescription,
        });
        if (((_d = definitionObj.image_url) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            embed.setImage(definitionObj.image_url);
        }
        await message.channel.send(embed);
    }
}
async function conch(message) {
    const filePath = utils_1.default.helper.getRandomMagicConchAudioFile();
    await utils_1.default.discordHelper.sendToVoiceChannel(message, filePath);
}
async function advice(message) {
    const { slip } = await utils_1.default.helper.request('GET', data_1.publicApis.advice, undefined) || null;
    if (slip) {
        await message.channel.send(slip.advice);
    }
}
async function xkdc(message, argument = null) {
    let comic = null;
    let currentComic;
    let index = '';
    // eslint-disable-next-line no-restricted-globals
    if (argument && !isNaN(argument)) {
        index = argument;
    }
    else if (!argument) {
        currentComic = await utils_1.default.helper.request('GET', data_1.publicApis.xkdc.current, undefined) || null;
        index = utils_1.default.helper.getRandomNumberInRange(0, currentComic.num).toString();
    }
    if (index.length > 0) {
        if (parseInt(index, 10) === 0) {
            if (currentComic) {
                comic = currentComic;
            }
            else {
                comic = await utils_1.default.helper.request('GET', data_1.publicApis.xkdc.current, undefined) || null;
            }
        }
        else {
            const url = data_1.publicApis.xkdc.specific.replace('INDEX', index);
            comic = await utils_1.default.helper.request('GET', url, undefined) || null;
        }
    }
    if (comic) {
        const date = new Date();
        date.setDate(parseInt(comic.day, 10));
        date.setMonth(parseInt(comic.month, 10));
        date.setFullYear(parseInt(comic.year, 10));
        const embed = new client_1.Discord.MessageEmbed({
            title: comic.title.length > 0 ? comic.title : comic.safe_title,
            description: `${comic.alt}\nLink: https://xkcd.com/${index}/`,
        });
        embed.setTimestamp(date);
        embed.setImage(comic.img);
        await message.channel.send(embed);
    }
}
async function defaultHandler(message) {
    const prefix = data_1.env.commandPrefix || '/wizard';
    const defaultMessage = `Could not find command, use '${prefix} help' to display all available commands.`;
    await message.channel.send(defaultMessage);
}
const handlers = {
    xkdc,
    advice,
    stats,
    help,
    ping,
    cat,
    quote,
    insult,
    bored,
    whatIs,
    conch,
    defaultHandler,
};
exports.default = handlers;
