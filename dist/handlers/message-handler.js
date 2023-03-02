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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = void 0;
var config_1 = __importDefault(require("config"));
var find_film_1 = require("../actions/find-film");
var find_film_link_1 = require("../actions/find-film-link");
var browser_1 = require("../browser");
var utils_1 = require("../utils");
var channelIds = config_1.default.get('bot').channelIds;
function messageHandler(message) {
    return __awaiter(this, void 0, void 0, function () {
        var content, filmId, _a, browser, page, _b, title, url, imageUrl, description, filmMessage, filmLinks, emb, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!channelIds.includes(Number(message.channel.id))) {
                        return [2 /*return*/];
                    }
                    content = message.content;
                    filmId = (0, utils_1.isKinopoiskLink)(content) && (0, utils_1.parseFilmIdFromLink)(content) || Number(content);
                    if (!filmId) {
                        return [2 /*return*/];
                    }
                    message.delete();
                    return [4 /*yield*/, (0, browser_1.initBrowser)()];
                case 1:
                    _a = _c.sent(), browser = _a[0], page = _a[1];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 6, 7, 8]);
                    return [4 /*yield*/, (0, find_film_1.findFilm)(page, filmId)];
                case 3:
                    _b = _c.sent(), title = _b.title, url = _b.url, imageUrl = _b.imageUrl, description = _b.description;
                    return [4 /*yield*/, message.channel.send({
                            embed: {
                                title: title,
                                url: url,
                                description: description,
                                thumbnail: {
                                    url: imageUrl || '',
                                }
                            }
                        })];
                case 4:
                    filmMessage = _c.sent();
                    return [4 /*yield*/, (0, find_film_link_1.findFilmLinks)(page, title)];
                case 5:
                    filmLinks = _c.sent();
                    emb = filmMessage.embeds[0];
                    emb.setDescription("\n                ".concat(emb.description, "\n\n                ").concat(filmLinks, "\n            "));
                    filmMessage.edit({
                        embed: emb,
                    });
                    return [3 /*break*/, 8];
                case 6:
                    err_1 = _c.sent();
                    console.error(err_1);
                    return [3 /*break*/, 8];
                case 7:
                    browser.close();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.messageHandler = messageHandler;
