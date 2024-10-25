import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        statusCode: string;
        access_token: string;
    }>;
    register(body: any): Promise<any>;
}
