import { commands } from '../data';

function statisticsSchema(list: Schema[]): void {
  const commandKeys = Object.keys(commands);
  const schema: Schema = {
    table: 'statistics',
    columns: ['ID'],
    datatypes: ['BIGINT PRIMARY KEY NOT NULL'],
  };
  const dataType = 'INT'; // INT4
  commandKeys.forEach((c: string) => {
    schema.columns.push(c);
    schema.datatypes.push(dataType);
  });
  list.push(schema);
}

function generateSchemata() {
  const schemataList: Schema[] = [];
  statisticsSchema(schemataList);

  return schemataList;
}

const schemata = generateSchemata();

export default schemata;
