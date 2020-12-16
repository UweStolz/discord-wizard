/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, PoolClient } from './pg';
import { env } from '../data';
import listener, { clientListener } from './listener';
import initilization from './initialization-migration/initilization';
import logger, { objLogger } from '../logger';

let pool: Pool;
let client: PoolClient;

async function startDatabaseClient(): Promise<void> {
  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
  listener(pool);
}

export async function getClient(): Promise<PoolClient> {
  if (!client) {
    client = await pool.connect();
  }
  return client;
}

export default async function setupDatabase(): Promise<PoolClient|null> {
  try {
    if (!env.disableDB) {
      logger.info('Start database initialization');
      await startDatabaseClient();
      await initilization();
      client = await getClient();
      clientListener(client);
    }
  } catch (err) {
    logger.error('Could not initialize database!');
    objLogger.error(err);
  }
  return client;
}
