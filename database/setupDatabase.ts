/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, QueryResult } from 'pg';
import { env } from '../data';
import schemata from './schemata';
import listener from './listener';
import logger, { objLogger } from '../logger';

let pool: Pool;

async function startDatabaseClient(): Promise<void> {
  if (!pool) {
    pool = new Pool({
      application_name: 'Discord - Wizard',
      connectionString: env.db.dataBaseUrl,
      user: env.db.user,
      database: env.db.database,
      password: env.db.password,
      port: typeof env.db.port === 'string' ? parseInt(env.db.port as string, 10) : env.db.port,
      keepAlive: true,
    });
  }
  listener(pool);
  await pool.connect();
}

export async function query(queryStream: string): Promise<QueryResult<any> | null> {
  let res: QueryResult<any>| null = null;
  try {
    res = await pool.query(queryStream);
    logger.info('Query successfully executed:');
    logger.info(queryStream);
  } catch (err) {
    logger.error('An error ocurred while executing the query:');
    logger.error(queryStream);
    objLogger.error(err);
  } finally {
    await pool.end();
  }
  return res;
}

async function initializeTables(): Promise<void> {
  logger.info('Start initializing tables');
  const tableQueries = [];

  for (let i = 0; i < schemata.length; i += 1) {
    const schema = schemata[i];
    let q = `${schema.columns[i]} ${schema.datatypes[i]}`;
    if (i !== schemata.length - 1) {
      q += ',';
    }
    tableQueries.push(q);
  }

  // eslint-disable-next-line no-restricted-syntax
  for await (const [index, schema] of schemata.entries()) {
    await query(`CREATE TABLE IF NOT EXIST ${schema.table}(${tableQueries[index]});`);
  }
  logger.info('Tables successfully initialized');
}

export default async function setupDatabase(): Promise<Pool> {
  try {
    logger.info('Start database initialization');
    await startDatabaseClient();
    await initializeTables();
  } catch (err) {
    logger.error('Could not initialize database!');
    objLogger.error(err);
  }
  return pool;
}
