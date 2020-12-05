export default function parser(input: string): ParsedInput {
  const parsedInput: ParsedInput = {
    command: null,
    argument: null,
  };
  const commandPrefix = '/wizard';
  const commandPrefixAlias = '/w';

  const isValidCommand = (input.startsWith(commandPrefix) || input.startsWith(commandPrefixAlias));
  if (isValidCommand) {
    const words = input.split(' ');
    parsedInput.command = words.length > 0 ? words[1] as Command : null;
    parsedInput.argument = words.length > 1 ? words[2] : null;
  }
  return parsedInput;
}
