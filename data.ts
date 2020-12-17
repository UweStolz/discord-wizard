/* eslint-disable @typescript-eslint/no-explicit-any */
import * as env from './env';

const commands = {
  conch: 'Play a random clip from the magic conch',
  stats: 'Display statistics for all available commands',
  help: 'Display all available commands',
  ping: 'Message to test the connection to the BOT',
  cat: '<fact|pic> Get a random cat fact, or image',
  quote: 'Get a random quote',
  insult: '[argument] - Insult one of the members, either randomly or targeted',
  bored: 'Find a random activity to fight boredom',
  whatIs: '<argument> - Definitions with example sentence and photo if available',
};

const publicApis = {
  catPic: 'https://aws.random.cat/meow',
  catFact: 'https://catfact.ninja/fact',
  insult: 'https://evilinsult.com/generate_insult.php?lang=en&type=json',
  bored: 'https://www.boredapi.com/api/activity/',
  owlbot: 'https://owlbot.info/api/v4/dictionary/',
  quotes: [
    {
      url: 'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
      response: (response: any): string => response[0],
    },
    {
      url: 'https://quote-garden.herokuapp.com/api/v3/quotes/random',
      response: (response: any): string => response.data[0].quoteText,
    },
  ],
};

export {
  env,
  commands,
  publicApis,
};
