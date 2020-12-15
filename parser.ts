import { env } from './data';

const commandPrefix = env.commandPrefix || '/wizard';
const commandPrefixAlias = env.commandPrefixAlias || '/w';

export default function parser(input: string): ParsedInput {
  const parsedInput: ParsedInput = {
    command: null,
    argument: null,
  };

  const cleanInput = input.trim();
  const isValidCommand = (cleanInput.startsWith(commandPrefix) || cleanInput.startsWith(commandPrefixAlias));
  if (isValidCommand) {
    const words = input.split(' ');
    parsedInput.command = words.length > 0 ? words[1] as Command : null;
    parsedInput.argument = words.length > 1 ? words[2] : null;
  }
  return parsedInput;
}
