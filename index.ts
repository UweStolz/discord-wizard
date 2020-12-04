import {
  Discord, initializeClient, getClient, loginClient, owlBotToken,
} from './client';
import request from './request';
import { publicApis, discordData } from './data';
import { getHelpMessage, getRandomNumberInRange } from './helper';

let client: Discord.Client;

function parseInput(input: string) {
  const parsedInput: ParsedInput = {
    command: null,
    argument: null,
  };
  const commandPrefix = '/wizard';
  const isValidCommand = input.startsWith(commandPrefix);
  if (isValidCommand) {
    const words = input.split(' ');
    parsedInput.command = words.length > 0 ? input[1] as Commands : null;
    parsedInput.argument = words.length > 1 ? input[2] : null;
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
    if (parsedInput) {
      switch (parsedInput.command) {
        case 'help': {
          const helpMessage = getHelpMessage();
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
          if (insult) {
            const list = client.guilds.cache.get(discordData.serverId);
            const members = list?.members.cache;
            if (members) {
              const randomNumber = getRandomNumberInRange(1, members?.size);
              const membersArr = members.array();
              const randomMember = membersArr[randomNumber];
              await message.channel.send(`${randomMember} ${insult}`);
            }
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

        default:
          break;
      }
    }
  });

  loginClient();
}

main();
