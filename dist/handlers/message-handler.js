var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from 'config';
import { findFilm } from '../actions/find-film.js';
import { isKinopoiskLink, parseFilmIdFromLink } from '../utils/index.js';
const { channelIds } = config.get('bot');
export function messageHandler(message) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!channelIds.includes(Number(message.channel.id))) {
            return;
        }
        const content = message.content;
        const filmId = (isKinopoiskLink(content) && parseFilmIdFromLink(content)) || Number(content);
        if (!filmId) {
            return;
        }
        message.delete().catch(console.error);
        try {
            const filmDto = yield findFilm(filmId);
            yield message.channel.send(filmDto.toDiscordMessage());
        }
        catch (err) {
            console.error(err);
        }
    });
}
