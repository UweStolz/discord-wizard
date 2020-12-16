import logger from '../../logger';
import query from '../query';

function commaIfItemIsForelast(a: number, b: number): string {
  let str = '';
  if (a !== b - 1) {
    str += ',';
  }
  return str;
}

function removeIdFromSchema(columns: string[]): string[] {
  const columnsWithoutId: string[] = [];
  columns.forEach((column: string) => {
    if (column.toLowerCase() !== 'id') {
      columnsWithoutId.push(column);
    }
  });
  return columnsWithoutId;
}

function getValueQuery(values: Record<string, unknown>[]): string {
  const keys = Object.keys(values[0]);
  let valueQuery = '';
  for (let index = 0; index < values.length; index += 1) {
    valueQuery += '(';

    for (let i = 0; i < keys.length; i += 1) {
      const val = values[index][keys[i]];
      valueQuery += typeof val === 'string' ? `'${val}'` : `${val}`;
      valueQuery += commaIfItemIsForelast(i, keys.length);
    }
    valueQuery += index !== values.length - 1 ? '),' : ')';
  }
  return valueQuery;
}

export function buildAlterTableQuery(queryPart: string, columnData: any[]): string {
  const fixedQueryPart = queryPart;
  let q = '';
  columnData.forEach((columnObj, index: number) => {
    q += `${fixedQueryPart} ${columnObj.column}`;
    q += commaIfItemIsForelast(index, columnData.length);
  });
  return q;
}

export function buildAlterTableQueryData(columnData: any[]): string {
  let q = '';
  columnData.forEach((columnObj, index: number) => {
    q += `${columnObj.column} ${columnObj.dataType}`;
    q += commaIfItemIsForelast(index, columnData.length);
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

export async function collectRemovableColumns(schema: Schema): Promise<any[] | null> {
  const columnsToRemove: any[] = [];
  const table = await query('SELECT * FROM statistics');
  if (table) {
    const fieldNamesInDB = table?.fields.map((field) => field.name);
    const fieldNamesInDBWithoutIndex = removeIdFromSchema(fieldNamesInDB);
    fieldNamesInDBWithoutIndex.forEach((name: string) => {
      const columnIndex = schema.columns.indexOf(name);
      if (columnIndex === -1) {
        columnsToRemove.push(name);
      }
    });
  }
  return columnsToRemove.length > 0 ? columnsToRemove : null;
}

export async function collectMissingColumns(schema: Schema): Promise<any[] | null> {
  const missingColumnData: any[] = [];
  const cols = removeIdFromSchema(schema.columns);
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
