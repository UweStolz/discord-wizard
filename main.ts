import logger from './logger';
import {
  Discord, initializeClient, getClient, loginClient,
} from './client';
import * as handler from './handler';
import parser from './parser';

let client: Discord.Client;

function startListener(): void {
  client.on('message', async (message) => {
    const parsedInput = parser(message.content);
    if (parsedInput.command) {
      switch (parsedInput.command) {
        case 'help': {
          await handler.help(message);
          break;
        }
        case 'ping':
          await handler.ping(message);
          break;
        case 'cat-fact': {
          await handler.catFact(message);
          break;
        }
        case 'cat-pic': {
          await handler.catPic(message);
          break;
        }
        case 'quote': {
          await handler.quote(message);
          break;
        }
        case 'insult': {
          await handler.insult(message, client, parsedInput.argument);
          break;
        }
        case 'bored': {
          await handler.bored(message);
          break;
        }
        case 'what-is': {
          await handler.whatIs(message, parsedInput.argument);
          break;
        }
        default: {
          await handler.defaultHandler(message);
          break;
        }
      }
    }
  });
}

export default async function main(): Promise<void> {
  await initializeClient();
  client = await getClient();
  client.on('ready', () => {
    logger.info('Application ready');
    logger.info('Starting listener..');
    startListener();
  });
  await loginClient();
}
