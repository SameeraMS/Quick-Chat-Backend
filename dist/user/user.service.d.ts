import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
export declare class UserService {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    findBySearch(search: string): Promise<any>;
    createUser({ email, username, password }: CreateUserDto): Promise<any>;
    updateUser(user: any): Promise<any>;
    getFriends({ id }: {
        id: any;
    }): Promise<{
        statusCode: string;
        friends: User[];
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        friends?: undefined;
    }>;
    setFriend({ id, otherId, status }: {
        id: any;
        otherId: any;
        status: any;
    }): Promise<{
        status: string;
        message: string;
        statusCode?: undefined;
    } | {
        statusCode: string;
        message: string;
        status?: undefined;
    }>;
    getRequests({ id }: {
        id: any;
    }): Promise<{
        statusCode: string;
        requests: User[];
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        requests?: undefined;
    }>;
    setRequest({ id, otherId, status }: {
        id: any;
        otherId: any;
        status: any;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
    getBlocked({ id }: {
        id: any;
    }): Promise<{
        statusCode: string;
        blocked: User[];
        message?: undefined;
    } | {
        statusCode: string;
        message: string;
        blocked?: undefined;
    }>;
    setBlocked({ id, otherId, status }: {
        id: any;
        otherId: any;
        status: any;
    }): Promise<{
        statusCode: string;
        message: string;
    }>;
}
