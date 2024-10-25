import { Sequelize } from "sequelize-typescript";
import { Channel } from "src/channel/channel.entity";
import { Message } from "src/message/message.entity";
import { User } from "src/user/user.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql", // Change to 'mysql'
        host: "localhost",
        port: 3306, // MySQL default port
        username: "root", // Update with your MySQL username
        password: "Ijse@123",
        database: "chatapp",
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
