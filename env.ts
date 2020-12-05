import 'dotenv/config';

const token = process.env.TOKEN;
const owlBotToken = process.env.OWLBOT;
const serverId = process.env.SERVERID;

// Database
const db = {
  dataBaseUrl: process.env.DATABASE_URL,
  database: process.env.database,
  user: process.env.user,
  port: process.env.port,
  password: process.env.password,
};

export {
  token,
  owlBotToken,
  serverId,
  db,
};
