import handlers from './handlers';
import utils from '../utils';
import { Discord } from '../client';

export default async function handleCommand(command: Command, message: Discord.Message, ...args: any[]): Promise<void> {
  const func = handlers[command];
  if (func) {
    await func(message, ...args);
    await utils.dbHelper.updateStatForColumn(command);
  } else {
    await handlers.defaultHandler(message);
  }
}
