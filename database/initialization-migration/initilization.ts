import logger from '../../logger';
import schemata from '../schemata';
import query from '../query';
import utils from '../../utils';
import {
  buildAlterTableQueryData, collectMissingColumns, insertValues, buildAlterTableQuery, collectRemovableColumns,
} from './migration';

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
    const createTableResult = await utils.dbHelper.createTableIfNotExist(schemata[index].table, tableQuery);

    // Check for further migration, if table already exists
    if (createTableResult && createTableResult?.rowCount === null) {
      // Try to collect missing columns from the DB, if any
      const missingColumnData = await collectMissingColumns(schemata[index]);
      if (missingColumnData) {
        // Add the missing columns with default data from the schema
        const queryData = buildAlterTableQueryData(missingColumnData);
        const alterTableQuery = `ALTER TABLE ${schemata[index].table} ADD COLUMN ${queryData}`;
        await query(alterTableQuery);
        await insertValues(schemata[index]);
      }

      // Remove columns which are not present in schema
      const columnsToRemove = await collectRemovableColumns(schemata[index]);
      if (columnsToRemove) {
        const queryData = buildAlterTableQuery('DROP COLUMN IF EXISTS', columnsToRemove);
        const alterTableQuery = `ALTER TABLE ${schemata[index].table} ${queryData}`;
        await query(alterTableQuery);
      }
    } else {
      // Insert default data, if table was just created
      await insertValues(schemata[index]);
    }
  }
  logger.info('Table(s) successfully initialized');
}
