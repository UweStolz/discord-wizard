import logger from '../../logger';
import getSchemata from '../schemata';
import query from '../query';
import { commands } from '../../data';

async function createDefaultRowsForStatistics(): Promise<void> {
  const commandNames = Object.keys(commands) || [];
  if (commandNames.length > 0) {
    logger.info('Initialize default rows for statistics');
    // eslint-disable-next-line no-restricted-syntax
    for await (const name of commandNames) {
      await query(`INSERT INTO statistics(id, name, count) VALUES(DEFAULT, '${name}', DEFAULT) ON CONFLICT DO NOTHING;`);
    }
  }
}

export default async function initilization(): Promise<void> {
  logger.info('Getting schemata');
  const schemata = await getSchemata();

  logger.info('Start initializing schemata');
  const schemataCount = schemata.length;

  if (schemataCount > 0) {
    let count = 1;
    // eslint-disable-next-line no-restricted-syntax
    for await (const q of schemata) {
      logger.info(`Initialize schema ${count}/${schemataCount}:`);
      await query(q);
      count += 1;
    }
    logger.info('Schemata successfully initialized');

    await createDefaultRowsForStatistics();
  }
}
