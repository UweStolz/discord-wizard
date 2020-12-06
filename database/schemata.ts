import { commands } from '../data';

function statisticsSchema(list: Schema[]): void {
  const commandKeys = Object.keys(commands);
  const schema: Schema = {
    table: 'statistics',
    columns: [
      'ID',
      'name',
      'count',
    ],
    datatypes: [
      'SERIAL PRIMARY KEY',
      'char(20) NOT NULL',
      'INT NOT NULL',
    ],
    values: [],
  };
  commandKeys.forEach((command: string) => {
    schema.values.push({
      name: command,
      count: 0,
    });
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
