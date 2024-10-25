import { Model } from "sequelize-typescript";
export declare class User extends Model {
    id: string;
    email: string;
    username: string;
    password: string;
    about: string;
    image: string;
    friends: Array<string>;
    blocked: Array<string>;
    requests: Array<string>;
    static hashPassword(user: User): Promise<void>;
}
