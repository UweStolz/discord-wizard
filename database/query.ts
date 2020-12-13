import { QueryResult } from './pg';
import { getClient } from './setupDatabase';
import logger, { objLogger } from '../logger';

export default async function query(queryStream: string): Promise<QueryResult<any> | null> {
  let res: QueryResult<any>| null = null;
  try {
    const connectedClient = await getClient();
    res = await connectedClient.query(queryStream);
    logger.info('Query successfully executed:');
    logger.info(queryStream);
    logger.info(`Row count: ${res.rowCount}`);
    objLogger.debug(res);
  } catch (err) {
    logger.error('An error ocurred while executing the query:');
    logger.error(queryStream);
    objLogger.error(err);
  }
  return res;
}
