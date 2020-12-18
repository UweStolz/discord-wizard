import { readdir, readFileSync } from 'fs-extra';
import { resolve } from 'path';
import logger, { objLogger } from '../../logger';

export default async function getSchemata(): Promise<string[]> {
  const schemata: string[] = [];
  const schemataPath = `${resolve()}/database/schemata`;

  try {
    const files = await readdir(schemataPath, { encoding: 'utf8' });
    files.forEach((file: string) => {
      if (file.endsWith('.sql')) {
        const fileContent = readFileSync(`${schemataPath}/${file}`, { encoding: 'utf8' });
        schemata.push(fileContent);
      }
    });
  } catch (err) {
    logger.error('Could not get schemata!');
    objLogger.error(err);
  }

  return schemata;
}
