import { readdir, readFile } from 'fs-extra';
import { resolve } from 'path';
import logger, { objLogger } from '../../logger';

export default async function getSchemata(): Promise<string[]> {
  const schemata: string[] = [];
  const schemataPath = `${resolve()}/database/schemata/queries`;

  try {
    const files = await readdir(schemataPath, { encoding: 'utf8' });

    // eslint-disable-next-line no-restricted-syntax
    for await (const file of files) {
      if (file.endsWith('.sql')) {
        const fileContent = await readFile(`${schemataPath}/${file}`, { encoding: 'utf8' });
        schemata.push(fileContent);
      }
    }
  } catch (err) {
    logger.error('Could not get schemata!');
    objLogger.error(err);
  }

  return schemata;
}
