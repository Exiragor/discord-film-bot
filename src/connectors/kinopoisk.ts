import config from 'config'
import { type KpConfig } from '../types/config.js'
import { type Movie } from '../types/movie.js'
import { FilmDto } from '../dto/film.dto.js'
import got from 'got'

const kpConfig = config.get<KpConfig>('kinopoisk')

export class Kinopoisk {
  private readonly baseHref = 'https://api.kinopoisk.dev'
  private readonly httpOptions = {
    headers: {
      'X-API-KEY': kpConfig.token
    }
  }

  async getFilmById (id: number): Promise<FilmDto> {
    const url = `${this.baseHref}/v1.3/movie/${id}`
    const data = await got(url, this.httpOptions).json<Movie>()

    return FilmDto.fromMovie(data)
  }
}
