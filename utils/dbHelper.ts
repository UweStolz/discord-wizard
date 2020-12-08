import { QueryResult } from 'pg';
import { query } from '../database';
import { buildChart } from './dependencyHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTableIfNotExist(table: string, tableQuery: string): Promise<QueryResult<any>|null> {
  const q = `CREATE TABLE IF NOT EXISTS ${table}(${tableQuery})`;
  return query(q);
}

export async function getStatistics(): Promise<Buffer|null> {
  let chart = null;
  const q = 'SELECT * FROM statistics ORDER BY id ASC';
  const res = await query(q);
  if (res) {
    const { rows } = res;

    const data = {
      labels: [] as string[],
      datasets: [] as number[],
    };
    rows.forEach((obj) => {
      data.labels.push(obj.name);
      data.datasets.push(obj.count);
    });
    chart = await buildChart(data);
  }
  return chart;
}

export async function updateStatForColumn(column: string): Promise<void> {
  await query('SELECT name from statistics');
  const q = `SELECT count FROM statistics WHERE name = '${column}'`;
  const res = await query(q);
  if (res) {
    const currentCount: number = res.rows[0].count;
    const updatedCount = currentCount + 1;
    const updateQuery = `UPDATE statistics SET count = ${updatedCount} WHERE name = '${column}'`;
    await query(updateQuery);
  }
}
