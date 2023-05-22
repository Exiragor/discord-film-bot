import { toKinopoiskLink } from '../utils/index.js';
export class FilmDto {
    constructor(title, url, description, imageUrl) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    toDiscordMessage() {
        return {
            embed: {
                title: this.title,
                url: this.url,
                description: this.description,
                thumbnail: {
                    url: this.imageUrl
                }
            }
        };
    }
    static fromMovie(movie) {
        const title = `${movie.name} (${movie.year})`;
        const url = toKinopoiskLink(movie.id);
        const parseRating = (rating) => rating.toFixed(1);
        const description = `
        ${url}
        Kp ${parseRating(movie.rating.kp)} — Imdb ${parseRating(movie.rating.imdb)} — Критики ${parseRating(movie.rating.filmCritics)}
        
        ${movie.shortDescription || ''}
    `;
        return new FilmDto(title, url, description, movie.poster.url);
    }
}
