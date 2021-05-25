"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicApis = exports.commands = exports.env = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const env = tslib_1.__importStar(require("./env"));
exports.env = env;
const commands = {
    xkdc: '[argument] Get either a random or a specific comic',
    advice: 'Display a random advice slip',
    conch: 'Play a random clip from the magic conch',
    stats: 'Display statistics for all available commands',
    help: 'Display all available commands',
    ping: 'Message to test the connection to the BOT',
    cat: '<fact|pic> Get a random cat fact, or image',
    quote: 'Get a random quote',
    insult: '[argument] - Insult one of the members, either randomly or targeted',
    bored: 'Find a random activity to fight boredom',
    whatIs: '<argument> - Definitions with example sentence and photo if available',
    number: '[random|argument] - Get trivia for a given number, a random number, or the number of the day',
    iss: 'Show the current location of the ISS',
};
exports.commands = commands;
const publicApis = {
    advice: 'https://api.adviceslip.com/advice',
    catPic: 'https://aws.random.cat/meow',
    catFact: 'https://catfact.ninja/fact',
    insult: 'https://evilinsult.com/generate_insult.php?lang=en&type=json',
    bored: 'https://www.boredapi.com/api/activity/',
    owlbot: 'https://owlbot.info/api/v4/dictionary/',
    number: 'http://numbersapi.com/',
    iss: 'http://api.open-notify.org/iss-now.json',
    xkdc: {
        current: 'http://xkcd.com/info.0.json',
        specific: 'http://xkcd.com/INDEX/info.0.json',
    },
    quotes: [
        {
            url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
            response: (response) => (response?.length > 0 ? response[0] : ''),
        },
        {
            url: 'https://quote-garden.herokuapp.com/api/v3/quotes/random',
            response: (response) => {
                let quote = '';
                if (response && response.statusCode === 200) {
                    quote = response.data[0].quoteText;
                }
                return quote;
            },
        },
    ],
};
exports.publicApis = publicApis;
