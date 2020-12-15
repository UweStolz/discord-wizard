import logger from './logger';
import {
  Discord, initializeClient, getClient, loginClient,
} from './client';
import { env } from './data';
import handleCommand from './handler';
import parser from './parser';

if (!env.disableDB) {
  // eslint-disable-next-line global-require
  require('./database');
}

let client: Discord.Client;

function startListener(): void {
  client.on('message', async (message) => {
    const { command, argument } = parser(message.content);
    if (command) {
      logger.info(`Command: ${command}`);
      if (argument) {
        logger.info(`Argument: ${argument}`);
      }
      await handleCommand(command, message, argument);
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
