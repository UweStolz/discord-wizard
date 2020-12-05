import { Pool, PoolClient } from 'pg';
import logger from '../logger';

export default function listener(pool: Pool): void {
  pool.on('connect', (client: PoolClient) => {
    logger.info('Database connected, client:');
    logger.info(client);
  });
  pool.on('acquire', (client: PoolClient) => {
    logger.info('Database checked out client:');
    logger.info(client);
  });
  pool.on('error', (err: Error, client: PoolClient) => {
    logger.error('An error ocurred in the DB');
    logger.error(`Client: ${client}`);
    logger.error(err);
  });
  pool.on('remove', (client: PoolClient) => {
    logger.info('Database closed and removed client');
    logger.info(`Client: ${client}`);
  });
}
