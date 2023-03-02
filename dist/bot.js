"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
var discord_js_1 = require("discord.js");
var Bot = /** @class */ (function () {
    function Bot(token) {
        this.client = new discord_js_1.Client();
        // init
        this.client.login(token);
    }
    Bot.prototype.register = function (event, handler) {
        this.client.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                handler.apply(void 0, args);
            }
            catch (e) {
                console.error(e);
            }
        });
    };
    return Bot;
}());
exports.Bot = Bot;
