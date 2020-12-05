import { query } from '../database';

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
  const q = `SELECT ${column} FROM statistics`;
  const res = await query(q);
  if (res) {
    const currentCount: number = res.rows[0];
    const updatedCount = currentCount + 1;
    const updateQuery = `UPDATE ${column} FROM statistics VALUE(${updatedCount})`;
    await query(updateQuery);
  }
}
