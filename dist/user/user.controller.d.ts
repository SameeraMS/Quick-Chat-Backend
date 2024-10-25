import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<{
        user: import("./user.entity").User;
    }>;
    getUsersBySearch(search: string): Promise<{
        users: any;
    }>;
    updateUser(id: string, body: any): Promise<{
        statusCode: string;
        message: string;
    }>;
    getRequest(id: string): Promise<{
        statusCode: string;
        requests: import("./user.entity").User[];
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        requests?: undefined;
    }>;
    setRequest(id: string, body: any): Promise<{
        statusCode: string;
        message: string;
    }>;
    getFriends(id: string): Promise<{
        statusCode: string;
        friends: import("./user.entity").User[];
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        friends?: undefined;
    }>;
    setFriend(id: string, body: any): Promise<{
        status: string;
        message: string;
        statusCode?: undefined;
    } | {
        statusCode: string;
        message: string;
        status?: undefined;
    }>;
    getBlocked(id: string): Promise<{
        statusCode: string;
        blocked: import("./user.entity").User[];
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        blocked?: undefined;
    }>;
    setBlocked(id: string, body: any): Promise<{
        statusCode: string;
        message: string;
    }>;
}
