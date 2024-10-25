import { Server } from "socket.io";
import { MessageService } from "src/message/message.service";
import { MessageDto } from "./dto/message-dto";
export declare class ChannelGateway {
    private messageService;
    constructor(messageService: MessageService);
    server: Server;
    handleMessage(message: MessageDto): void;
}
