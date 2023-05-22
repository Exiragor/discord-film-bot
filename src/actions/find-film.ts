import { type FilmDto } from '../dto/film.dto.js'
import { Kinopoisk } from '../connectors/kinopoisk.js'

export async function findFilm (id: number): Promise<FilmDto> {
  const kp = new Kinopoisk()

  return await kp.getFilmById(id)
}
