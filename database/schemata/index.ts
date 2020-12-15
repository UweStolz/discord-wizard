import statistics from './statistics';

function generateSchemata() {
  const schemataList: Schema[] = [];
  statistics(schemataList);

  return schemataList;
}

const schemata = generateSchemata();

export default schemata;
