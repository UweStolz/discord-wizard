import { getMemberFromServer, validateMember } from './discordHelper';
import {
  getHelpMessage, getRandomNumberInRange, globallyReplaceDashWithUnderscore, globallyReplaceUnderscoreWithDash,
} from './helper';
import { getStatistics, updateStatForColumn, createTableIfNotExist } from './dbHelper';

const utils = {
  helper: {
    getHelpMessage,
    getRandomNumberInRange,
    globallyReplaceDashWithUnderscore,
    globallyReplaceUnderscoreWithDash,
  },
  discordHelper: {
    getMemberFromServer,
    validateMember,
  },
  dbHelper: {
    getStatistics,
    updateStatForColumn,
    createTableIfNotExist,
  },
};

export default utils;
