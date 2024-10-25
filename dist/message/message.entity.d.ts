import { Model } from "sequelize-typescript";
import { Channel } from "src/channel/channel.entity";
import { User } from "src/user/user.entity";
export declare class Message extends Model {
    id: string;
    channelId: string;
    channel: Channel;
    userId: string;
    user: User;
    text: string;
    images: string[];
}
