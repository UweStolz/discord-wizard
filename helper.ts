import { commands } from './data';

export function getHelpMessage(): string {
  let message = '';
  const descriptions = Object.values(commands);
  Object.keys(commands).forEach((command: string, index: number) => {
    message += `${command}: ${descriptions[index]} \n`;
  });
  return message;
}

export function getRandomNumberInRange(min: number, max: number): number {
  const randomNumber = Math.floor(
    Math.random() * (max - min + 1) + min,
  );
  return randomNumber;
}
