import logger from '../../logger';
import query from '../query';

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

export function buildAlterTableQueryData(columnData: any[]): string {
  let q = '';
  columnData.forEach((columnObj, index: number) => {
    q += `${columnObj.column} ${columnObj.dataType}`;
    if (index !== columnData.length - 1) {
      q += ',';
    }
  });
  return q;
}

export async function insertValues(schema: Schema): Promise<void> {
  logger.info('Inserting default data');
  const cols = schema.columns.splice(1).toString();
  const values = getValueQuery(schema.values);
  const insertQuery = `INSERT INTO ${schema.table}(${cols}) VALUES ${values}`;
  await query(insertQuery);
}

export async function collectMissingColumns(schema: Schema): Promise<any[] | null> {
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
