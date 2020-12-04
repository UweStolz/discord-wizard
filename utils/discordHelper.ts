import { Discord } from '../client';
import { discordData } from '../data';

export function getMemberFromServer(client: Discord.Client): Discord.GuildMember[] | null {
  let membersArr = null;
  const list = client.guilds.cache.get(discordData.serverId);
  const members = list?.members.cache;
  if (members) {
    membersArr = members.array();
  }
  return membersArr;
}

export function validateMember(member: string, memberList: Discord.GuildMember[]): boolean {
  return !!memberList.find((m) => (m.toString() === member));
}
