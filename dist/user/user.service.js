"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const sequelize_1 = require("sequelize");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    async findByEmail(email) {
        const user = await user_entity_1.User.findOne({ where: { email } });
        return user;
    }
    async findById(id) {
        const user = await user_entity_1.User.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
        return user;
    }
    async findBySearch(search) {
        const users = await user_entity_1.User.findAll({
            where: { username: { [sequelize_1.Op.like]: `%${search}%` } },
        });
        return users;
    }
    async createUser({ email, username, password }) {
        const user = await user_entity_1.User.create({
            email,
            username,
            password,
        });
        return user;
    }
    async updateUser(user) {
        try {
            const updatedUser = await user_entity_1.User.update(user, { where: { id: user.id } });
            return updatedUser;
        }
        catch (_a) {
            return {
                statusCode: "409",
                message: "This username is already in use.",
            };
        }
    }
    async getFriends({ id }) {
        try {
            const user = await this.findById(id);
            if (!user)
                throw new exceptions_1.NotFoundException("User not found.");
            const friendsIds = user.friends || [];
            const friends = await user_entity_1.User.findAll({
                where: { id: friendsIds },
            });
            return {
                statusCode: "200",
                friends,
            };
        }
        catch (error) {
            return {
                statusCode: "404",
                message: "Friends not found.",
            };
        }
    }
    async setFriend({ id, otherId, status }) {
        const firstUser = await this.findById(id);
        const secondUser = await this.findById(otherId);
        if (!firstUser || !secondUser) {
            throw new exceptions_1.NotFoundException("User not found.");
        }
        firstUser.friends = firstUser.friends || [];
        secondUser.friends = secondUser.friends || [];
        firstUser.blocked = firstUser.blocked || [];
        secondUser.blocked = secondUser.blocked || [];
        if (firstUser.blocked.includes(otherId) ||
            secondUser.blocked.includes(id)) {
            return {
                status: "406",
                message: "You cannot do this. You are blocked.",
            };
        }
        if (status) {
            if (firstUser.friends.includes(otherId)) {
                return {
                    statusCode: "409",
                    message: "You are already friends.",
                };
            }
            this.setRequest({ id: otherId, otherId: id, status: false });
            firstUser.friends = [...firstUser.friends, otherId];
            secondUser.friends = [...secondUser.friends, id];
            await firstUser.save();
            await secondUser.save();
        }
        else {
            firstUser.friends = firstUser.friends.filter((friendId) => friendId !== otherId);
            secondUser.friends = secondUser.friends.filter((friendId) => friendId !== id);
            await firstUser.save();
            await secondUser.save();
        }
        return {
            statusCode: "200",
            message: "Friendship updated successfully.",
        };
    }
    async getRequests({ id }) {
        try {
            const user = await this.findById(id);
            if (!user)
                throw new exceptions_1.NotFoundException("User not found.");
            const requestIds = user.requests || [];
            const requests = await user_entity_1.User.findAll({
                where: { id: requestIds },
            });
            return {
                statusCode: "200",
                requests,
            };
        }
        catch (error) {
            return {
                statusCode: "404",
                message: "Requests not found.",
            };
        }
    }
    async setRequest({ id, otherId, status }) {
        const firstUser = await this.findById(id);
        const secondUser = await this.findById(otherId);
        if (!firstUser || !secondUser)
            throw new exceptions_1.NotFoundException("User not found.");
        secondUser.requests = secondUser.requests || [];
        if (status) {
            if (secondUser.requests.includes(id)) {
                return {
                    statusCode: "409",
                    message: "You already sent a request to this user.",
                };
            }
            secondUser.requests = [...secondUser.requests, id];
            await secondUser.save();
        }
        else {
            secondUser.requests = secondUser.requests.filter((requestId) => requestId !== id);
            await secondUser.save();
        }
        return {
            statusCode: "200",
            message: "Request updated successfully.",
        };
    }
    async getBlocked({ id }) {
        try {
            const user = await this.findById(id);
            if (!user)
                throw new exceptions_1.NotFoundException("User not found.");
            const blockedIds = user.blocked || [];
            const blocked = await user_entity_1.User.findAll({
                where: { id: blockedIds },
            });
            return {
                statusCode: "200",
                blocked,
            };
        }
        catch (error) {
            return {
                statusCode: "404",
                message: "Blocked users not found.",
            };
        }
    }
    async setBlocked({ id, otherId, status }) {
        const firstUser = await this.findById(id);
        const secondUser = await this.findById(otherId);
        if (!firstUser || !secondUser)
            throw new exceptions_1.NotFoundException("User not found.");
        firstUser.blocked = firstUser.blocked || [];
        if (status) {
            if (firstUser.blocked.includes(otherId)) {
                return {
                    statusCode: "409",
                    message: "This user is already blocked.",
                };
            }
            await this.setFriend({ id, otherId, status: false });
            await this.setRequest({ id, otherId, status: false });
            firstUser.blocked = [...firstUser.blocked, otherId];
            await firstUser.save();
        }
        else {
            firstUser.blocked = firstUser.blocked.filter((blockedId) => blockedId !== otherId);
            await firstUser.save();
        }
        return {
            statusCode: "200",
            message: "Block status updated successfully.",
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map