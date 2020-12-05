import { Discord } from './client';
import utils from './utils';
import { publicApis, env } from './data';
import request from './request';
import logger from './logger';

export async function stats(message: Discord.Message): Promise<void> {
  const statistics: string = await utils.dbHelper.getStatistics();
  const embed = new Discord.MessageEmbed({
    title: 'Statistics',
    description: statistics,
  });
  await message.channel.send(embed);
}

export async function help(message: Discord.Message): Promise<void> {
  const helpMessage = utils.helper.getHelpMessage();
  const embed = new Discord.MessageEmbed({
    title: 'Helpful help, that really helps...probably',
    description: helpMessage,
  });
  await message.channel.send(embed);
}

export async function ping(message: Discord.Message): Promise<void> {
  await message.channel.send('pong');
  await utils.dbHelper.updateStatForColumn('ping');
}

export async function catFact(message: Discord.Message): Promise<void> {
  const { fact } = await request('GET', publicApis.catFact, undefined);
  if (fact) {
    await message.channel.send(`FACT: "${fact}"`);
  }
}

export async function catPic(message: Discord.Message): Promise<void> {
  const { file } = await request('GET', publicApis.catPic, undefined);
  if (file) {
    await message.channel.send(file);
  }
}

export async function quote(message: Discord.Message): Promise<void> {
  const requestedQuote = await request('GET', publicApis.quotes[0], undefined);
  if (requestedQuote.length > 0) {
    await message.channel.send(`Quote: "${requestedQuote[0]}"`);
  }
}

export async function insult(message: Discord.Message, client: Discord.Client, argument: string|null = null): Promise<void> {
  const insultToMember = await request('GET', publicApis.insult, undefined) || null;
  const allMembers = utils.discordHelper.getMemberFromServer(client);

  if (insultToMember && allMembers) {
    const members = allMembers?.filter((m) => (m.displayName !== 'wizard'));
    const utf8ConvertedInsult = Buffer.from(insultToMember, 'utf-8');

    let member: Discord.GuildMember;
    if (argument) {
      const validatedMember = utils.discordHelper.validateMember(argument, members);
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
}

export async function bored(message: Discord.Message): Promise<void> {
  const { activity } = await request('GET', publicApis.bored, undefined) || null;
  if (activity) {
    await message.channel.send(`How about..? - ${activity}`);
  }
}

export async function whatIs(message: Discord.Message, argument: string|null = null): Promise<void> {
  const owlBotResponse: owlbotResponse = await request(
    'GET',
    `${publicApis.owlbot}${argument}`,
    {
      headers: {
        Authorization: `Token ${env.owlBotToken}`,
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
}

export async function defaultHandler(message: Discord.Message): Promise<void> {
  const defaultMessage = "Could not find command, use '/wizard help' to display all available commands.";
  await message.channel.send(defaultMessage);
}

// TODO
const handlerMapping = {
  stats: async (message: Discord.Message) => stats(message),
};

export default async function handleMessage(command: Command, message: Discord.Message) {
  await utils.dbHelper.updateStatForColumn('ping');
}
