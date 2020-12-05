import Discord from 'discord.js';
import { env } from './data';

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
  client.login(env.token);
}

export {
  Discord,
};
