import { getMemberFromServer, validateMember, sendToVoiceChannel } from './discordHelper';
import {
  getHelpMessage, getRandomNumberInRange, getRandomMagicConchAudioFile,
} from './helper';
import { getStatistics, updateStatForColumn, createTableIfNotExist } from './dbHelper';
import { buildMap } from './dependencyHelper';
import request from './request';

const utils = {
  helper: {
    request,
    getHelpMessage,
    getRandomNumberInRange,
    getRandomMagicConchAudioFile,
  },
  dependencyHelper: {
    buildMap,
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
