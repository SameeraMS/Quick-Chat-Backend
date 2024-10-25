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
exports.ChannelGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("../message/message.service");
const message_dto_1 = require("./dto/message-dto");
let ChannelGateway = class ChannelGateway {
    constructor(messageService) {
        this.messageService = messageService;
    }
    handleMessage(message) {
        this.server.emit("chat", message);
        this.messageService.addMessage(message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChannelGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("chat"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_dto_1.MessageDto]),
    __metadata("design:returntype", void 0)
], ChannelGateway.prototype, "handleMessage", null);
ChannelGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], ChannelGateway);
exports.ChannelGateway = ChannelGateway;
//# sourceMappingURL=channel.gateway.js.map