import { Discord } from '../client';
import { env } from '../data';

export function getMemberFromServer(client: Discord.Client): Discord.GuildMember[] | null {
  let membersArr = null;
  const list = client.guilds.cache.get(env.serverId as string);
  const members = list?.members.cache;
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
