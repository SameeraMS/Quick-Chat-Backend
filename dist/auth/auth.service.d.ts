import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login({ dataValues }: {
        dataValues: any;
    }): Promise<{
        statusCode: string;
        access_token: string;
    }>;
    register(userDoc: CreateUserDto): Promise<any>;
}
