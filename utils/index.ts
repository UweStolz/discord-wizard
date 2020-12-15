import { getMemberFromServer, validateMember, sendToVoiceChannel } from './discordHelper';
import {
  getHelpMessage, getRandomNumberInRange, getRandomMagicConchAudioFile,
} from './helper';
import { getStatistics, updateStatForColumn, createTableIfNotExist } from './dbHelper';

const utils = {
  helper: {
    getHelpMessage,
    getRandomNumberInRange,
    getRandomMagicConchAudioFile,
  },
  discordHelper: {
    getMemberFromServer,
    validateMember,
    sendToVoiceChannel,
  },
  dbHelper: {
    getStatistics,
    updateStatForColumn,
    createTableIfNotExist,
  },
};

export default utils;
