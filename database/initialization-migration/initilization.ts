import logger from '../../logger';
import schemata from '../schemata';
import query from '../query';
import utils from '../../utils';
import { buildAlterTableQueryData, collectMissingColumns, insertValues } from './migration';

export default async function initilization(): Promise<void> {
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
