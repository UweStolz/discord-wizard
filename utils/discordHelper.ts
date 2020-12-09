import { Discord, getClient } from '../client';
import { env } from '../data';
import logger, { objLogger } from '../logger';

export async function sendToVoiceChannel(message: Discord.Message, filePath: string): Promise<void> {
  if (message) {
    if (!message.guild) return;

    if (message.member?.voice.channel) {
      const connection = await message.member.voice.channel.join();
      logger.info(`Playing file: ${filePath}`);
      const dispatcher = connection.play(filePath);
      dispatcher.on('finish', () => {
        logger.info('Finished playing audio clip');
        dispatcher.destroy();
        connection.disconnect();
      });
      dispatcher.on('error', (err: Error) => {
        logger.error('An error occurred while playing the audio clip!');
        objLogger.error(err);
        connection.disconnect();
      });
    } else {
      message.channel.send('You need to join a voice channel first!');
    }
  }
}

export async function getMemberFromServer(): Promise<Discord.GuildMember[] | null> {
  const client = await getClient();
  let membersArr = null;
  const guild = client.guilds.cache.get(env.serverId as string);
  const members = guild?.members.cache;
  if (members) {
    membersArr = members.array();
  }
  return membersArr;
}

export function validateMember(member: string, memberList: Discord.GuildMember[]): Discord.GuildMember | undefined {
  const cleanMember = member.trim();
  const displayNameOfMember = cleanMember.startsWith('@') ? cleanMember.substr(1) : cleanMember;
  return memberList.find((m) => ((m.displayName === displayNameOfMember || m.nickname === displayNameOfMember)));
}
