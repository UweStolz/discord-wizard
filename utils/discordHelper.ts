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

export function validateMember(member: string, memberList: Discord.GuildMember[]): Discord.GuildMember|undefined {
  const displayNameOfMember = member.startsWith('@') ? member.substr(1) : member;
  return memberList.find((m) => ((m.displayName === displayNameOfMember || m.nickname === displayNameOfMember)));
}
