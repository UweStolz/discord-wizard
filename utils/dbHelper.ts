import { QueryResult } from 'pg';
import { query } from '../database';
import { globallyReplaceDashWithUnderscore } from './helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTableIfNotExist(table: string, tableQuery: string): Promise<QueryResult<any>|null> {
  const q = `CREATE TABLE IF NOT EXISTS ${table}(${tableQuery})`;
  const cleanedQuery = globallyReplaceDashWithUnderscore(q);
  return query(cleanedQuery);
}

export async function getStatistics(): Promise<string> {
  let statistics = '';
  const q = 'SELECT * FROM statistics';
  const res = await query(q);
  if (res) {
    const { fields, rows } = res;
    for (let index = 0; index < fields.length; index += 1) {
      statistics += `${fields[index].name} `;
    }
    statistics += `\n${rows.toString()}`;
  }
  return statistics;
}

export async function updateStatForColumn(column: string): Promise<void> {
  const q = `SELECT count FROM statistics WHERE name == ${column}`;
  const res = await query(q);
  if (res) {
    const currentCount: number = res.rows[0];
    const updatedCount = currentCount + 1;
    const updateQuery = `UPDATE count FROM statistics  WHERE name == ${column} VALUE(${updatedCount})`;
    await query(updateQuery);
  }
}
