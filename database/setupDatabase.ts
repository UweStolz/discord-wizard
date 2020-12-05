/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, PoolClient, QueryResult } from 'pg';
import { env } from '../data';
import schemata from './schemata';
import listener, { clientListener } from './listener';
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

export async function query(queryStream: string): Promise<QueryResult<any> | null> {
  let res: QueryResult<any>| null = null;
  try {
    const connectedClient = await getClient();
    res = await connectedClient.query(queryStream);
    logger.info('Query successfully executed:');
    logger.info(queryStream);
    objLogger.info(res);
  } catch (err) {
    logger.error('An error ocurred while executing the query:');
    logger.error(queryStream);
    objLogger.error(err);
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
    const cleanedQuery = q.replace('-', '_');
    await query(cleanedQuery);
  }
  logger.info('Tables successfully initialized');
}

export default async function setupDatabase(): Promise<PoolClient|null> {
  try {
    logger.info('Start database initialization');
    await startDatabaseClient();
    await initializeTables();
    client = await getClient();
    clientListener(client);
  } catch (err) {
    logger.error('Could not initialize database!');
    objLogger.error(err);
  }
  return client;
}
