import logger from './logger';
import {
  Discord, initializeClient, getClient, loginClient, owlBotToken,
} from './client';
import request from './request';
import { publicApis } from './data';
import utils from './utils';

let client: Discord.Client;

function parseInput(input: string): ParsedInput {
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

async function main(): Promise<void> {
  await initializeClient();
  client = await getClient();
  client.on('ready', () => {
    console.log('Ready');
  });

  client.on('message', async (message) => {
    const parsedInput = parseInput(message.content);
    if (parsedInput.command) {
      switch (parsedInput.command) {
        case 'help': {
          const helpMessage = utils.helper.getHelpMessage();
          const embed = new Discord.MessageEmbed({
            title: 'Helpful help, that really helps...probably',
            description: helpMessage,
          });
          await message.channel.send(embed);
          break;
        }
        case 'ping':
          await message.channel.send('pong');
          break;
        case 'cat-fact': {
          const catFact = await request('GET', publicApis.catFact, undefined);
          if (catFact) {
            await message.channel.send(`FACT: "${catFact.fact}"`);
          }
          break;
        }
        case 'cat-pic': {
          const catPic = await request('GET', publicApis.catPic, undefined);
          if (catPic) {
            await message.channel.send(catPic.file);
          }
          break;
        }
        case 'quote': {
          const quote = await request('GET', publicApis.quotes[0], undefined);
          if (quote.length > 0) {
            await message.channel.send(`Quote: "${quote[0]}"`);
          }
          break;
        }
        case 'insult': {
          const { insult } = await request('GET', publicApis.insult, undefined) || null;
          const allMembers = utils.discordHelper.getMemberFromServer(client);

          if (insult && allMembers) {
            const members = allMembers?.filter((m) => (m.displayName !== 'wizard'));
            const utf8ConvertedInsult = Buffer.from(insult, 'utf-8');

            let member: Discord.GuildMember;
            if (parsedInput.argument) {
              const validatedMember = utils.discordHelper.validateMember(parsedInput.argument, members);
              if (validatedMember) {
                member = validatedMember;
              } else {
                logger.warn('Member not in list');
                return;
              }
            } else if ((members.length) === 1) {
              // eslint-disable-next-line prefer-destructuring
              member = members[0];
            } else {
              const randomNumber = utils.helper.getRandomNumberInRange(1, members.length - 1);
              member = members[randomNumber];
            }
            await message.channel.send(`${member} ${utf8ConvertedInsult}`);
          }
          break;
        }
        case 'bored': {
          const { activity } = await request('GET', publicApis.bored, undefined) || null;
          if (activity) {
            await message.channel.send(`How about..? - ${activity}`);
          }
          break;
        }
        case 'what-is': {
          const owlBotResponse: owlbotResponse = await request(
            'GET',
            `${publicApis.owlbot}${parsedInput.argument}`,
            {
              headers: {
                Authorization: `Token ${owlBotToken}`,
              },
            },
          );
          if (owlBotResponse) {
            const definitionObj = owlBotResponse.definitions[0];
            const emoji = definitionObj?.emoji;
            let wordDescription = '';

            wordDescription += definitionObj.definition?.length > 0 ? `Definition: ${definitionObj.definition} ${emoji || ''}\n` : '';
            wordDescription += definitionObj.type?.length > 0 ? `Type: ${definitionObj.type}\n` : '';
            wordDescription += definitionObj.example?.length > 0 ? `Example: ${definitionObj.example}\n` : '';

            const embed = new Discord.MessageEmbed({
              title: owlBotResponse.word,
              description: wordDescription,
            });
            if (definitionObj.image_url?.length > 0) {
              embed.setImage(definitionObj.image_url);
            }
            await message.channel.send(embed);
          }
          break;
        }
        default: {
          const defaultMessage = "Could not find command, use '/wizard help' to display all available commands.";
          await message.channel.send(defaultMessage);
          break;
        }
      }
    }
  });

  loginClient();
}

main();
