export type FilmId = number

export interface Movie {
  id: number
  name: string
  url: string
  shortDescription: string
  year: number
  poster: {
    url: string
    previewUrl: string
  }
  rating: {
    kp: number
    imdb: number
    filmCritics: number
  }
}

export interface Film {
  title: string
  url: string
  description: string
  imageUrl: string
}
