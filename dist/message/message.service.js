"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const channel_entity_1 = require("../channel/channel.entity");
const user_entity_1 = require("../user/user.entity");
const message_entity_1 = require("./message.entity");
let MessageService = class MessageService {
    async getMessage({ id }) {
        try {
            const message = await message_entity_1.Message.findByPk(id);
            return message;
        }
        catch (error) {
            return {
                statusCode: "404",
                message: "Message not found.",
            };
        }
    }
    async getMessagesByChannel({ id }) {
        try {
            const messages = await message_entity_1.Message.findAll({
                where: { channelId: id },
                order: [["createdAt", "ASC"]],
                include: user_entity_1.User,
            });
            return messages;
        }
        catch (error) {
            return {
                statusCode: "404",
                message: "Message not found.",
            };
        }
    }
    async addMessage({ text, images, channelId, userId }) {
        try {
            const message = await message_entity_1.Message.create({ text, images, channelId, userId });
            await channel_entity_1.Channel.update({
                messages: sequelize_1.default.fn("array_append", sequelize_1.default.col("messages"), message.id),
            }, { where: { id: message.channelId } });
            return {
                statusCode: "201",
                message: "Message created successfully.",
            };
        }
        catch (error) {
            return {
                statusCode: 400,
                message: error,
            };
        }
    }
    async updateMessage({ id, message }) {
        try {
            await message_entity_1.Message.update(message, { where: { id } });
            return {
                statusCode: "200",
                message: "Message updated successfully.",
            };
        }
        catch (_a) {
            return {
                statusCode: "404",
                message: "Message not found.",
            };
        }
    }
    async deleteMessage({ id }) {
        try {
            await message_entity_1.Message.destroy({ where: { id } });
            return {
                statusCode: "200",
                message: "Message deleted successfully.",
            };
        }
        catch (_a) {
            return {
                statusCode: "404",
                message: "Message not found.",
            };
        }
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)()
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map