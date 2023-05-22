import config from 'config';
import { DiscordBot } from './connectors/discord-bot.js';
import { messageHandler } from './handlers/message-handler.js';
const botConfig = config.get('bot');
const bot = new DiscordBot(botConfig.token);
bot.register('message', messageHandler);
