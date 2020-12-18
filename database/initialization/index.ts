import logger from '../../logger';
import getSchemata from '../schemata';
import query from '../query';

export default async function initilization(): Promise<void> {
  logger.info('Getting schemata');
  const schemata = await getSchemata();

  logger.info('Start initializing schemata');
  const schemataCount = schemata.length;

  logger.info(schemataCount);
  if (schemataCount > 0) {
    let count = 1;
    // eslint-disable-next-line no-restricted-syntax
    for await (const q of schemata) {
      logger.info(`Initialize schema ${count}/${schemataCount}:`);
      await query(q);
      count += 1;
    }
    logger.info('Schemata successfully initialized');
  }
}
