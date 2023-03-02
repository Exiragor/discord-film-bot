import {Message} from 'discord.js';

import { Browser } from '../browser';
import { isKinopoiskLink, parseFilmIdFromLink } from '../utils';

export function messageHandler(message: Message) {
    const content = message.content;
    const filmId = isKinopoiskLink(content) && parseFilmIdFromLink(content) || Number(content);

    if (!filmId) {
        return;
    }

    const browser = new Browser();
    browser.findFilmById(filmId);
}