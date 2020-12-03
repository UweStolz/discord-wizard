import {
  Discord, initializeClient, getClient, loginClient,
} from './client';

let client: Discord.Client;
let isLoggedIn = false;

async function main(): Promise<void> {
  const commandPrefix = '/wizard';
  await initializeClient();
  client = await getClient();
  client.on('ready', () => {
    console.log('Ready');
    isLoggedIn = true;
  });

  client.on('message', (message) => {
    const isValidCommand = message.content.startsWith(commandPrefix);
    if (isValidCommand) {
      const command = message.content.substr(7).trim();
      switch (command) {
        case 'ping':
          message.channel.send('pong');
          break;

        default:
          break;
      }
    }
  });

  loginClient();
}

main();
