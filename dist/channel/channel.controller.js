"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const channel_service_1 = require("./channel.service");
const create_channel_dto_1 = require("./dto/create-channel-dto");
let ChannelController = class ChannelController {
    constructor(channelService) {
        this.channelService = channelService;
    }
    async getChannel(id) {
        const channel = await this.channelService.getChannel(id);
        return channel;
    }
    async getChannelByUserId(userId) {
        const channels = await this.channelService.getChannelsByUser(userId);
        return channels;
    }
    async createChannel(body) {
        const result = await this.channelService.createChannel(body);
        return result;
    }
    async updateChannel(id, body) {
        const result = await this.channelService.updateChannel(id, body);
        return result;
    }
    async deleteChannel(id) {
        const result = await this.channelService.deleteChannel(id);
        return result;
    }
};
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannel", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelByUserId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_channel_dto_1.ChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, decorators_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannel", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, decorators_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "deleteChannel", null);
ChannelController = __decorate([
    (0, common_1.Controller)("channels"),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
exports.ChannelController = ChannelController;
//# sourceMappingURL=channel.controller.js.map