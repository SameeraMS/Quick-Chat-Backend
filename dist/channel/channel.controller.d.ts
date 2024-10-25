import { ChannelService } from "./channel.service";
import { ChannelDto } from "./dto/create-channel-dto";
export declare class ChannelController {
    private channelService;
    constructor(channelService: ChannelService);
    getChannel(id: string): Promise<import("./channel.entity").Channel | {
        statusCode: string;
        message: string;
    }>;
    getChannelByUserId(userId: string): Promise<{
        lastMessages: import("../message/message.entity").Message[];
        channels: import("./channel.entity").Channel[];
        statusCode?: undefined;
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        lastMessages?: undefined;
        channels?: undefined;
    }>;
    createChannel(body: ChannelDto): Promise<{
        statusCode: string;
        message: string;
        channel: import("./channel.entity").Channel;
    } | {
        statusCode: string;
        message: any;
        channel?: undefined;
    }>;
    updateChannel(id: string, body: any): Promise<{
        statusCode: string;
        message: string;
    }>;
    deleteChannel(id: string): Promise<{
        statusCode: string;
        message: string;
    }>;
}
