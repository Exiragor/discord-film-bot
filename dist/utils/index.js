export const isKinopoiskLink = (link) => link.includes('kinopoisk.ru/film');
export const toKinopoiskLink = (id) => `https://www.kinopoisk.ru/film/${id}/`;
export const parseFilmIdFromLink = (link) => Number((link.split('/').filter(Number)[0])) || 0;
