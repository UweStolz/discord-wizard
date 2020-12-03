import { Discord, initializeClient, getClient } from './client';

let client: Discord.Client;

async function main(): Promise<void> {
  await initializeClient();
  client = await getClient();
}
