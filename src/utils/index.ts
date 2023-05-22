export const isKinopoiskLink = (link: string): boolean => link.includes('kinopoisk.ru/film')
export const toKinopoiskLink = (id: number): string => `https://www.kinopoisk.ru/film/${id}/`
export const parseFilmIdFromLink = (link: string): number => Number((link.split('/').filter(Number)[0])) || 0
