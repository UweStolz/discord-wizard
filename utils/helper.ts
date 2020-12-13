import { readdirSync } from 'fs';
import { resolve } from 'path';
import { commands } from '../data';

const magicConchAudioFiles: string[] = [];
let helpMessage = '';

export function getHelpMessage(): string {
  if (helpMessage.length === 0) {
    const descriptions = Object.values(commands);
    Object.keys(commands).forEach((command: string, index: number) => {
      helpMessage += `${command}: ${descriptions[index]} \n`;
    });
  }
  return helpMessage;
}

export function getRandomNumberInRange(min: number, max: number): number {
  const randomNumber = Math.floor(
    Math.random() * (max - min + 1) + min,
  );
  return randomNumber;
}

export function getRandomMagicConchAudioFile(): string {
  if (magicConchAudioFiles.length === 0) {
    const rootDir = resolve();
    const audioFilesDir = `${rootDir}/assets/audio/magicConch`;
    readdirSync(audioFilesDir).forEach((path) => {
      magicConchAudioFiles.push(`${audioFilesDir}/${path}`);
    });
  }

  const randomNumber = getRandomNumberInRange(0, magicConchAudioFiles.length - 1);
  const randomFile = magicConchAudioFiles[randomNumber];
  return randomFile;
}
