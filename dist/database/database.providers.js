"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const channel_entity_1 = require("../channel/channel.entity");
const message_entity_1 = require("../message/message.entity");
const user_entity_1 = require("../user/user.entity");
exports.databaseProviders = [
    {
        provide: "SEQUELIZE",
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
                dialect: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "Ijse@123",
                database: "chatapp",
            });
            sequelize.addModels([user_entity_1.User, message_entity_1.Message, channel_entity_1.Channel]);
            await sequelize.sync({ alter: true });
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map