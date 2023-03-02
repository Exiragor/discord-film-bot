export const isKinopoiskLink = (link: string) => link.includes('kinopoisk.ru/film');
export const parseFilmIdFromLink = (link: string) => Number(link.split('/').filter(Number)[0] || 0);