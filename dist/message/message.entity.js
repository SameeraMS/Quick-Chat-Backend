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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const channel_entity_1 = require("../channel/channel.entity");
const user_entity_1 = require("../user/user.entity");
let Message = class Message extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV1()),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => channel_entity_1.Channel),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Message.prototype, "channelId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => channel_entity_1.Channel),
    __metadata("design:type", channel_entity_1.Channel)
], Message.prototype, "channel", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Message.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Message.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Array)
], Message.prototype, "images", void 0);
Message = __decorate([
    (0, sequelize_typescript_1.Table)({ updatedAt: false })
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map