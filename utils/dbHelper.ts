import { QueryResult } from 'pg';
import QuickChart from 'quickchart-js';
import { query } from '../database';
import { globallyReplaceDashWithUnderscore, globallyReplaceUnderscoreWithDash } from './helper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTableIfNotExist(table: string, tableQuery: string): Promise<QueryResult<any>|null> {
  const q = `CREATE TABLE IF NOT EXISTS ${table}(${tableQuery})`;
  const cleanedQuery = globallyReplaceDashWithUnderscore(q);
  return query(cleanedQuery);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function buildChart(data: any): Promise<Buffer> {
  const chart = new QuickChart();
  chart
    .setConfig({
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          { label: 'Command - Count', data: data.datasets },
        ],
      },
    })
    .setWidth(800)
    .setHeight(400)
    .setBackgroundColor('transparent');
  const chartBuffer = chart.toBinary();
  return chartBuffer;
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
      const name = globallyReplaceUnderscoreWithDash(obj.name);
      data.labels.push(name);
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
