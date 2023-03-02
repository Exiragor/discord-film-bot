"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFilm = void 0;
function findFilm(page, id) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, title, url, span, rating, btn, imageUrl, description;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, page.goto("https://www.google.com/search?q=kinopoisk+".concat(id))];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a, _b, _c;
                            var search = document.querySelector('#search');
                            var blocks = Array.from((search === null || search === void 0 ? void 0 : search.querySelectorAll('div.g')) || []);
                            var film = blocks.find(function (block) { var _a, _b; return (_b = (_a = block.querySelector('cite')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.includes('film'); });
                            if (!film)
                                return {};
                            var title = (((_b = (_a = film.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.split(' -')) || [''])[0];
                            var url = (_c = film.querySelector('a')) === null || _c === void 0 ? void 0 : _c.href;
                            return {
                                title: title,
                                url: url
                            };
                        })];
                case 2:
                    _a = _b.sent(), title = _a.title, url = _a.url;
                    return [4 /*yield*/, page.$x("//span[contains(., 'Рейтинг: ')]")];
                case 3:
                    span = (_b.sent())[0];
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, span)];
                case 4:
                    rating = _b.sent();
                    return [4 /*yield*/, page.$x("//a[contains(., 'Картинки')]")];
                case 5:
                    btn = (_b.sent())[0];
                    return [4 /*yield*/, btn.click()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector('#islrg')];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, page.click("#islrg a")];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, page.waitForSelector('#islsp')];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, page.waitForTimeout(500)];
                case 11:
                    _b.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var _a, _b;
                            return ((_b = (_a = document.querySelector('#islsp')) === null || _a === void 0 ? void 0 : _a.querySelector('a > img')) === null || _b === void 0 ? void 0 : _b.src) || '';
                        })];
                case 12:
                    imageUrl = _b.sent();
                    description = "\n        ".concat(url, "\n        ").concat(rating, "\n    ");
                    return [2 /*return*/, {
                            title: title || '',
                            url: url || '',
                            imageUrl: imageUrl,
                            description: description
                        }];
            }
        });
    });
}
exports.findFilm = findFilm;
