import { getMemberFromServer, validateMember, sendToVoiceChannel } from './discordHelper';
import {
  getHelpMessage, getRandomNumberInRange, getRandomMagicConchAudioFile,
} from './helper';
import { getStatistics, updateStatForColumn, createTableIfNotExist } from './dbHelper';
import request from './request';

const utils = {
  helper: {
    request,
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
