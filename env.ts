import 'dotenv/config';

const token = process.env.TOKEN;
const owlBotToken = process.env.OWLBOT;
const serverId = process.env.SERVERID;
const databaseUrl = process.env.DATABASE_URL;

export {
  token,
  owlBotToken,
  serverId,
  databaseUrl,
};
