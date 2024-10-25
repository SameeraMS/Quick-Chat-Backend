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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const message_service_1 = require("./message.service");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getMessage(id) {
        const message = await this.messageService.getMessage({ id });
        return message;
    }
    async getMessagesByChannel(id) {
        const message = await this.messageService.getMessagesByChannel({ id });
        return message;
    }
    async createMessage(body) {
        const result = await this.messageService.addMessage(body);
        return result;
    }
    async updateMessage(id, body) {
        const result = await this.messageService.updateMessage({
            id,
            message: body,
        });
        return result;
    }
    async deleteMessage(id) {
        const result = await this.messageService.deleteMessage({ id });
        return result;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessage", null);
__decorate([
    (0, common_1.Get)("channel/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessagesByChannel", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessage", null);
MessageController = __decorate([
    (0, common_1.Controller)("messages"),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map