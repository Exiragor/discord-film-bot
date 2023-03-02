import config from 'config';

import { Bot } from './bot';
import { messageHandler } from './handlers/message-handler';
import { BotConfig } from './types/config';

const botConfig = config.get<BotConfig>('bot');
const bot = new Bot(botConfig.token);

bot.register('message', messageHandler);