"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const message_entity_1 = require("../message/message.entity");
const user_entity_1 = require("../user/user.entity");
const channel_entity_1 = require("./channel.entity");
let ChannelService = class ChannelService {
    async getChannel(id) {
        try {
            const channel = await channel_entity_1.Channel.findByPk(id);
            if (!channel) {
                return {
                    statusCode: "404",
                    message: "Channel not found.",
                };
            }
            const participants = await user_entity_1.User.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.in]: channel.participants,
                    },
                },
            });
            channel.participants = participants.map((user) => user.id);
            return channel;
        }
        catch (error) {
            console.error("Error fetching channel:", error);
            return {
                statusCode: "500",
                message: "Internal server error.",
            };
        }
    }
    async createChannel(channelDto) {
        try {
            const channel = await channel_entity_1.Channel.create(channelDto);
            return {
                statusCode: "201",
                message: "Channel created successfully.",
                channel,
            };
        }
        catch (error) {
            console.error("Error creating channel:", error);
            return {
                statusCode: "400",
                message: error.message || "Bad request.",
            };
        }
    }
    async getChannelsByUser(userId) {
        try {
            const channels = await channel_entity_1.Channel.findAll({
                where: {
                    participants: {
                        [sequelize_1.Op.contains]: [userId],
                    },
                },
                order: [["updatedAt", "DESC"]],
                attributes: { exclude: ["messages", "createdAt"] },
            });
            const lastMessages = await Promise.all(channels.map((channel) => message_entity_1.Message.findOne({
                where: { channelId: channel.id },
                order: [["createdAt", "DESC"]],
            })));
            return {
                lastMessages,
                channels,
            };
        }
        catch (error) {
            console.error("Error fetching channels:", error);
            return {
                statusCode: "500",
                message: "Internal server error.",
            };
        }
    }
    async updateChannel(id, channel) {
        try {
            const [updatedRows] = await channel_entity_1.Channel.update(channel, { where: { id } });
            if (updatedRows === 0) {
                return {
                    statusCode: "404",
                    message: "Channel not found.",
                };
            }
            return {
                statusCode: "200",
                message: "Channel updated successfully.",
            };
        }
        catch (error) {
            console.error("Error updating channel:", error);
            return {
                statusCode: "500",
                message: "Internal server error.",
            };
        }
    }
    async deleteChannel(id) {
        try {
            const deletedRows = await channel_entity_1.Channel.destroy({ where: { id } });
            if (deletedRows === 0) {
                return {
                    statusCode: "404",
                    message: "Channel not found.",
                };
            }
            return {
                statusCode: "200",
                message: "Channel deleted successfully.",
            };
        }
        catch (error) {
            console.error("Error deleting channel:", error);
            return {
                statusCode: "500",
                message: "Internal server error.",
            };
        }
    }
};
ChannelService = __decorate([
    (0, common_1.Injectable)()
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map