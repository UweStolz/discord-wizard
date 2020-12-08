import { getMemberFromServer, validateMember } from './discordHelper';
import { getHelpMessage, getRandomNumberInRange, replaceInText } from './helper';
import { getStatistics, updateStatForColumn, createTableIfNotExist } from './dbHelper';

const utils = {
  helper: {
    getHelpMessage,
    getRandomNumberInRange,
    replaceInText,
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
