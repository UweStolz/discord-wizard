import 'dotenv/config';
import Discord from 'discord.js';

const token = process.env.TOKEN;

let client: Discord.Client;

export function initializeClient(): void {
  client = new Discord.Client();
  client.login(token);
}

export function getClient(): Discord.Client {
  return client;
}

export { Discord };
