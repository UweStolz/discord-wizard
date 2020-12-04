import {
  Discord, initializeClient, getClient, loginClient, owlBotToken,
} from './client';
import request from './request';
import { commands, publicApis } from './data';

let client: Discord.Client;
let isLoggedIn = false;

function getHelpMessage(): string {
  let message = '';
  const descriptions = Object.values(commands);
  Object.keys(commands).forEach((command: string, index: number) => {
    message += `${command}: ${descriptions[index]} \n`;
  });
  return message;
}

async function main(): Promise<void> {
  const commandPrefix = '/wizard';
  await initializeClient();
  client = await getClient();
  client.on('ready', () => {
    console.log('Ready');
    isLoggedIn = true;
  });

  client.on('message', async (message) => {
    const isValidCommand = message.content.startsWith(commandPrefix);
    if (isValidCommand) {
      const input = message.content.split(' ');
      const command = input.length > 0 ? input[1] : null;
      const argument = input.length > 1 ? input[2] : null;

      if (!command) { return; }

      switch (command) {
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
        case 'gotd':
          // Send Gif of the day
          // message.channel.send();
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
          const insult = await request('GET', publicApis.insult, undefined);
          if (insult) {
            const list = client.guilds.cache.get('200274891847499776');
            const members = list?.members.cache;
            if (members) {
              const randomNumber = Math.floor(
                Math.random() * (members?.size - 1) + 1,
              );
              const membersArr = members.array();
              const randomMember = membersArr[randomNumber];
              await message.channel.send(`${randomMember} ${insult.insult}`);
            }
          }
          break;
        }
        case 'bored': {
          const activity = await request('GET', publicApis.bored, undefined);
          if (activity) {
            await message.channel.send(`How about..? - ${activity.activity}`);
          }
          break;
        }
        case 'what-is': {
          const owlBotResponse: owlbotResponse = await request(
            'GET',
            `${publicApis.owlbot}${argument}`,
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
