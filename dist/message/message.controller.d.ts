import { MessageService } from "./message.service";
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    getMessage(id: string): Promise<import("./message.entity").Message | {
        statusCode: string;
        message: string;
    }>;
    getMessagesByChannel(id: string): Promise<import("./message.entity").Message[] | {
        statusCode: string;
        message: string;
    }>;
    createMessage(body: any): Promise<{
        statusCode: string;
        message: string;
    } | {
        statusCode: number;
        message: any;
    }>;
    updateMessage(id: string, body: any): Promise<{
        statusCode: string;
        message: string;
    }>;
    deleteMessage(id: string): Promise<{
        statusCode: string;
        message: string;
    }>;
}
