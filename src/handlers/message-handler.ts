import config from 'config';
import {Message} from 'discord.js';
import { findFilm } from '../actions/find-film';
import { findFilmLinks } from '../actions/find-film-link';

import { initBrowser } from '../browser';
import { BotConfig } from '../types/config';
import { isKinopoiskLink, parseFilmIdFromLink } from '../utils';

const {channelIds} = config.get<BotConfig>('bot');

export async function messageHandler(message: Message) {
    if (!channelIds.includes(Number(message.channel.id))) {
        return;
    }

    const content = message.content;
    const filmId = isKinopoiskLink(content) && parseFilmIdFromLink(content) || Number(content);

    if (!filmId) {
        return;
    }

    message.delete();

    const [browser, page] = await initBrowser();

    try {
        const {title, url, imageUrl, description} = await findFilm(page, filmId);

        const filmMessage = await message.channel.send({
            embed: {
                title,
                url,
                description,
                thumbnail: {
                    url: imageUrl || '',
                }
            }
        });

        const filmLinks = await findFilmLinks(page, title);

        const [emb] = filmMessage.embeds;
        emb.setDescription(
            `
                ${emb.description}

                ${filmLinks}
            `
        );

        filmMessage.edit({
            embed: emb,
        })
    } catch(err) {
        console.error(err);
    } finally {
        browser.close();
    }
}