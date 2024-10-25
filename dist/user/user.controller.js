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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(id) {
        const user = await this.userService.findById(id);
        return { user };
    }
    async getUsersBySearch(search) {
        const users = await this.userService.findBySearch(search);
        return { users };
    }
    async updateUser(id, body) {
        await this.userService.updateUser(Object.assign({ id }, body));
        return {
            statusCode: "200",
            message: "User updated successfully.",
        };
    }
    async getRequest(id) {
        const result = await this.userService.getRequests({ id });
        return result;
    }
    async setRequest(id, body) {
        const result = await this.userService.setRequest(Object.assign({ id }, body));
        return result;
    }
    async getFriends(id) {
        const result = await this.userService.getFriends({ id });
        return result;
    }
    async setFriend(id, body) {
        const result = await this.userService.setFriend(Object.assign({ id }, body));
        return result;
    }
    async getBlocked(id) {
        const result = await this.userService.getBlocked({ id });
        return result;
    }
    async setBlocked(id, body) {
        const result = await this.userService.setBlocked(Object.assign({ id }, body));
        return result;
    }
};
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(""),
    __param(0, (0, decorators_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersBySearch", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)(":id/request"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":id/request"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setRequest", null);
__decorate([
    (0, common_1.Get)(":id/friend"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriends", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":id/friend"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setFriend", null);
__decorate([
    (0, common_1.Get)(":id/block"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getBlocked", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(":id/block"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setBlocked", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map