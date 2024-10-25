import { CreateMessageDto } from "./dto/create-message-dto";
import { Message } from "./message.entity";
export declare class MessageService {
    getMessage({ id }: {
        id: any;
    }): Promise<Message | {
        statusCode: string;
        message: string;
    }>;
    getMessagesByChannel({ id }: {
        id: any;
    }): Promise<Message[] | {
        statusCode: string;
        message: string;
    }>;
    addMessage({ text, images, channelId, userId }: CreateMessageDto): Promise<{
        statusCode: string;
        message: string;
    } | {
        statusCode: number;
        message: any;
    }>;
    updateMessage({ id, message }: {
        id: any;
        message: any;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    deleteMessage({ id }: {
        id: any;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
}
