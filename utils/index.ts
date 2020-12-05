import { getMemberFromServer, validateMember } from './discordHelper';
import { getHelpMessage, getRandomNumberInRange } from './helper';
import { getStatistics, updateStatForColumn } from './dbHelper';

const utils = {
  helper: {
    getHelpMessage,
    getRandomNumberInRange,
  },
  discordHelper: {
    getMemberFromServer,
    validateMember,
  },
  dbHelper: {
    getStatistics,
    updateStatForColumn,
  },
};

export default utils;
