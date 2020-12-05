import { Pool, PoolClient } from 'pg';
import logger, { objLogger } from '../logger';

export default function listener(pool: Pool): void {
  pool.on('connect', (client: PoolClient) => {
    logger.info('Database connected, client:');
    objLogger.debug(client);
  });
  pool.on('acquire', (client: PoolClient) => {
    logger.info('Database checked out client:');
    objLogger.info(client);
  });
  pool.on('error', (err: Error, client: PoolClient) => {
    logger.error('An error ocurred in the DB');
    objLogger.error(`Client: ${client}`);
    objLogger.error(err);
  });
  pool.on('remove', (client: PoolClient) => {
    logger.info('Database closed and removed client');
    objLogger.debug(client);
  });
}
