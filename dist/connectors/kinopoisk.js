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
import { FilmDto } from '../dto/film.dto.js';
import got from 'got';
const kpConfig = config.get('kinopoisk');
export class Kinopoisk {
    constructor() {
        this.baseHref = 'https://api.kinopoisk.dev';
        this.httpOptions = {
            headers: {
                'X-API-KEY': kpConfig.token
            }
        };
    }
    getFilmById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseHref}/v1.3/movie/${id}`;
            const data = yield got(url, this.httpOptions).json();
            return FilmDto.fromMovie(data);
        });
    }
}
