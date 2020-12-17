import 'dotenv/config';

const token = process.env.TOKEN;
const owlBotToken = process.env.OWLBOT;
const serverId = process.env.SERVERID;
const databaseUrl = process.env.DATABASE_URL;
const commandPrefix = process.env.C_PREFIX;
const commandPrefixAlias = process.env.C_ALIAS;
const disableDB = !!process.env.DISABLE_DB;
const disableMigrationOfDB = !!process.env.DISABLE_DB_MIGRATION;

export {
  token,
  owlBotToken,
  serverId,
  databaseUrl,
  commandPrefix,
  commandPrefixAlias,
  disableDB,
  disableMigrationOfDB,
};
