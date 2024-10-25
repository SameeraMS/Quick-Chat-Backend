import { Message } from "src/message/message.entity";
import { Channel } from "./channel.entity";
import { ChannelDto } from "./dto/create-channel-dto";
type ChannelCreationAttributes = Partial<ChannelDto>;
export declare class ChannelService {
    getChannel(id: string): Promise<Channel | {
        statusCode: string;
        message: string;
    }>;
    createChannel(channelDto: ChannelCreationAttributes): Promise<{
        statusCode: string;
        message: string;
        channel: Channel;
    } | {
        statusCode: string;
        message: any;
        channel?: undefined;
    }>;
    getChannelsByUser(userId: string): Promise<{
        lastMessages: Message[];
        channels: Channel[];
        statusCode?: undefined;
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        lastMessages?: undefined;
        channels?: undefined;
    }>;
    updateChannel(id: string, channel: Partial<ChannelDto>): Promise<{
        statusCode: string;
        message: string;
    }>;
    deleteChannel(id: string): Promise<{
        statusCode: string;
        message: string;
    }>;
}
export {};
