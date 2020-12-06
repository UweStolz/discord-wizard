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
      connectionString: env.databaseUrl,
      ssl: {
        rejectUnauthorized: false,
      },
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
    let q = '';
    for (let index = 0; index < schema.columns.length; index += 1) {
      q += `${schema.columns[index]} ${schema.datatypes[index]}`;
      if (index !== schema.columns.length - 1) {
        q += ', ';
      }
    }
    tableQueries.push(q);
  }

  // eslint-disable-next-line no-restricted-syntax
  for await (const [index, tableQuery] of tableQueries.entries()) {
    const q = `CREATE TABLE IF NOT EXISTS ${schemata[index].table}(${tableQuery})`;
    await query(q);
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
