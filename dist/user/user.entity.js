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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const bcrypt = require("bcryptjs");
let User = class User extends sequelize_typescript_1.Model {
    static async hashPassword(user) {
        if (user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.getDataValue("password"), salt);
            return user.setDataValue("password", hashedPassword);
        }
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4()),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(20)),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "about", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)("https://res.cloudinary.com/dtzs4c2uv/image/upload/v1666326774/noavatar_rxbrbk.png"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Array)
], User.prototype, "blocked", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON),
    __metadata("design:type", Array)
], User.prototype, "requests", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ createdAt: false, updatedAt: false })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map