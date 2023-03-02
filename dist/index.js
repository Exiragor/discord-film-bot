"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var bot_1 = require("./bot");
var message_handler_1 = require("./handlers/message-handler");
var botConfig = config_1.default.get('bot');
var bot = new bot_1.Bot(botConfig.token);
bot.register('message', message_handler_1.messageHandler);
