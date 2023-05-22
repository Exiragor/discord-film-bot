import config from 'config'
import { findFilm } from '../actions/find-film.js'

import { type Message } from 'discord.js'
import { type BotConfig } from '../types/config.js'
import { isKinopoiskLink, parseFilmIdFromLink } from '../utils/index.js'

const { channelIds } = config.get<BotConfig>('bot')

export async function messageHandler (message: Message): Promise<void> {
  if (!channelIds.includes(Number(message.channel.id))) {
    return
  }

  const content = message.content
  const filmId: number = (isKinopoiskLink(content) && parseFilmIdFromLink(content)) || Number(content)

  if (!filmId) {
    return
  }

  message.delete().catch(console.error)

  try {
    const filmDto = await findFilm(filmId)
    await message.channel.send(filmDto.toDiscordMessage())
  } catch (err) {
    console.error(err)
  }
}
