import handlers from './handlers';
import utils from '../utils';
import { env } from '../data';
import { Discord } from '../client';

export default async function handleCommand(command: Command, message: Discord.Message, ...args: any[]): Promise<void> {
  const func = handlers[command];
  if (func) {
    await func(message, ...args);
    if (!env.disableDB) {
      await utils.dbHelper.updateStatForColumn(command);
    }
  } else {
    await handlers.defaultHandler(message);
  }
}
