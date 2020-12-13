/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, PoolClient } from './pg';
import { env } from '../data';
import schemata from './schemata';
import listener, { clientListener } from './listener';
import logger, { objLogger } from '../logger';
import utils from '../utils';
import query from './query';

/*
  TODO:
    - handle migration
    - cleanup/refactoring
*/

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

function getValueQuery(values: Record<string, unknown>[]): string {
  const keys = Object.keys(values[0]);
  let valueQuery = '';
  for (let index = 0; index < values.length; index += 1) {
    valueQuery += '(';

    for (let i = 0; i < keys.length; i += 1) {
      const val = values[index][keys[i]];
      valueQuery += typeof val === 'string' ? `'${val}'` : `${val}`;
      if (i !== keys.length - 1) {
        valueQuery += ',';
      }
    }
    valueQuery += index !== values.length - 1 ? '),' : ')';
  }
  return valueQuery;
}

function buildAlterTableQueryData(columnData: any[]): string {
  let q = '';
  columnData.forEach((columnObj, index: number) => {
    q += `${columnObj.column} ${columnObj.dataType}`;
    if (index !== columnData.length - 1) {
      q += ',';
    }
  });
  return q;
}

async function collectMissingColumns(schema: Schema): Promise<any[] | null> {
  const missingColumnData: any[] = [];
  const cols = schema.columns.splice(1);
  const table = await query('SELECT * FROM statistics');
  if (table) {
    const fieldNamesInDB = table?.fields.map((field) => field.name);
    cols.forEach((name: string, index: number) => {
      const columnIndex = fieldNamesInDB.indexOf(name);

      if (columnIndex === -1) {
        const obj = {
          column: name,
          value: schema.values[index],
          dataType: schema.datatypes[index],
        };
        missingColumnData.push(obj);
      }
    });
  }
  return missingColumnData.length > 0 ? missingColumnData : null;
}

async function insertValues(schema: Schema): Promise<void> {
  logger.info('Inserting default data');
  const cols = schema.columns.splice(1).toString();
  const values = getValueQuery(schema.values);
  const insertQuery = `INSERT INTO ${schema.table}(${cols}) VALUES ${values}`;
  await query(insertQuery);
}

async function initializeTables(): Promise<void> {
  logger.info('Start initializing tables');
  const tableQueries = [];

  for (let i = 0; i < schemata.length; i += 1) {
    const schema = schemata[i];
    const tempQuery = [];
    for (let index = 0; index < schema.columns.length; index += 1) {
      tempQuery.push(`${schema.columns[index]} ${schema.datatypes[index]}`);
    }
    const q = tempQuery.toString();
    tableQueries.push(q);
  }

  // eslint-disable-next-line no-restricted-syntax
  for await (const [index, tableQuery] of tableQueries.entries()) {
    // Create the table for given schema, if it doesn't exist already
    await utils.dbHelper.createTableIfNotExist(schemata[index].table, tableQuery);

    // If the table is empty fill it with default data
    const checkForData = await query(`SELECT 1 FROM ${schemata[index].table}`);
    if (schemata[index].values.length > 0 && checkForData && checkForData?.rowCount === 0) {
      await insertValues(schemata[index]);
    } else {
      // Try to collect missing columns from the DB, if any
      const missingColumnData = await collectMissingColumns(schemata[index]);

      if (missingColumnData) {
        // Add the missing columns with default data from the schema
        const queryData = buildAlterTableQueryData(missingColumnData);
        const alterTableQuery = `ALTER TABLE ${schemata[index].table} ADD COLUMN ${queryData}`;
        await query(alterTableQuery);
        await insertValues(schemata[index]);
      }
    }
  }
  logger.info('Tables successfully initialized');
}

export default async function setupDatabase(): Promise<PoolClient|null> {
  try {
    if (!env.disableDB) {
      logger.info('Start database initialization');
      await startDatabaseClient();
      await initializeTables();
      client = await getClient();
      clientListener(client);
    }
  } catch (err) {
    logger.error('Could not initialize database!');
    objLogger.error(err);
  }
  return client;
}
