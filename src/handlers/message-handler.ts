import {Message} from 'discord.js';
import {take} from 'rxjs';

import { Browser } from '../browser';
import { isKinopoiskLink, parseFilmIdFromLink } from '../utils';

export function messageHandler(message: Message) {
    const content = message.content;
    const filmId = isKinopoiskLink(content) && parseFilmIdFromLink(content) || Number(content);

    if (!filmId) {
        return;
    }

    let currentMessage: Message;
    message.delete();

    const browser = new Browser();
    browser.film$.pipe(take(1)).subscribe(({title, url, imageUrl, description}) => {
        message.channel.send({
            embed: {
                title,
                url,
                description,
                thumbnail: {
                    url: imageUrl || '',
                }
            }
        }).then((mess) => {
            currentMessage = mess;
            browser.findWatchLinks(title);
        })
    });

    browser.findFilmById(filmId);
}