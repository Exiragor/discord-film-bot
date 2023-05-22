import config from 'config'

import { DiscordBot } from './connectors/discord-bot.js'
import { messageHandler } from './handlers/message-handler.js'
import { type BotConfig } from './types/config.js'

const botConfig = config.get<BotConfig>('bot')
const bot = new DiscordBot(botConfig.token)

bot.register('message', messageHandler)
