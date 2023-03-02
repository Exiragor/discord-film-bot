"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFilmIdFromLink = exports.isKinopoiskLink = void 0;
var isKinopoiskLink = function (link) { return link.includes('kinopoisk.ru/film'); };
exports.isKinopoiskLink = isKinopoiskLink;
var parseFilmIdFromLink = function (link) { return Number(link.split('/').filter(Number)[0] || 0); };
exports.parseFilmIdFromLink = parseFilmIdFromLink;
