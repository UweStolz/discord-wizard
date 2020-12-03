import 'dotenv/config';
import Discord from 'discord.js';

const token = process.env.TOKEN;
const permissions = process.env.PERMISSIONS;
const clientID = process.env.CLIENT_ID;
const publicKes = process.env.PUBLIC_KEY;

let client: Discord.Client;

export async function initializeClient(): Promise<void> {
  client = new Discord.Client();
}

export async function getClient(): Promise<Discord.Client> {
  if (!client) {
    await initializeClient();
  }
  return client;
}

export async function loginClient(): Promise<void> {
  client.login(token);
}

export { Discord };
