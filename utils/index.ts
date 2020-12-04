import { getMemberFromServer, validateMember } from './discordHelper';
import { getHelpMessage, getRandomNumberInRange } from './helper';

const utils = {
  helper: {
    getHelpMessage,
    getRandomNumberInRange,
  },
  discordHelper: {
    getMemberFromServer,
    validateMember,
  },
};

export default utils;
