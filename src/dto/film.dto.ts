import { type Film } from '../types/film.js'
import { type Movie } from '../types/movie.js'
import { toKinopoiskLink } from '../utils/index.js'
import { type MessageOptions } from 'discord.js'

export class FilmDto implements Film {
  constructor (
    readonly title: string,
    readonly url: string,
    readonly description: string,
    readonly imageUrl: string
  ) {}

  toDiscordMessage (): MessageOptions {
    return {
      embed: {
        title: this.title,
        url: this.url,
        description: this.description,
        thumbnail: {
          url: this.imageUrl
        }
      }
    }
  }

  static fromMovie (movie: Movie): FilmDto {
    const title = `${movie.name} (${movie.year})`
    const url = toKinopoiskLink(movie.id)
    const parseRating = (rating: number): string => rating.toFixed(1)

    const description = `
        ${url}
        Kp ${parseRating(movie.rating.kp)} — Imdb ${parseRating(movie.rating.imdb)} — Критики ${parseRating(movie.rating.filmCritics)}
        
        ${movie.shortDescription || ''}
    `

    return new FilmDto(
      title,
      url,
      description,
      movie.poster.url
    )
  }
}
