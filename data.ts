const commands = {
  ping: 'Message to test the connection to the BOT',
  'cat-fact': 'Get a random cat fact',
  'cat-pic': 'Get a random static cat picture',
  quote: 'Get a random quote',
  insult: 'Randomly insult one of the members',
  bored: 'Find a random activity to fight boredom',
  'what-is': '<argument> - Definitions with example sentence and photo if available',
};

const publicApis = {
  catPic: 'https://aws.random.cat/meow',
  catFact: 'https://catfact.ninja/fact',
  insult: 'https://evilinsult.com/generate_insult.php?lang=en&type=json',
  bored: 'https://www.boredapi.com/api/activity/',
  owlbot: 'https://owlbot.info/api/v4/dictionary/',
  quotes: [
    'https://ron-swanson-quotes.herokuapp.com/v2/quotes',
  ],
};

const discordData = {
  serverId: '200274891847499776',
};

export {
  commands,
  publicApis,
  discordData,
};
