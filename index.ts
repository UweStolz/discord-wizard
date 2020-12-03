import { Discord, initializeClient, getClient } from './client';

let client: Discord.Client;

function main() {
  initializeClient();
  client = getClient();
}
