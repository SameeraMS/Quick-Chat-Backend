import { Model } from "sequelize-typescript";
export declare class Channel extends Model {
    id: string;
    participants: string[];
    admins: string[];
    description: string;
    messages: string[];
    name: string;
    image: string;
}
