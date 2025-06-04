import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    constructor(private authService: AuthService) {}

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const result = await this.authService.register(username, password);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error?.message || 'Registration failed' });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const result = await this.authService.login(username, password);
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ message: error?.message || 'Login failed' });
        }
    }

    async refreshAccessToken(req: Request, res: Response): Promise<void> {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                res.status(400).json({ message: 'Refresh token is required' });
                return;
            }

            const { accessToken } = await this.authService.refreshAccessToken(refreshToken);
            res.json({ accessToken });
        } catch (error: any) {
            res.status(401).json({ message: error?.message || 'Token refresh failed' });
        }
    }

    async validateAccessToken(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'No access token provided' });
                return;
            }

            const user = await this.authService.validateAccessToken(token);
            res.json({ user });
        } catch (error: any) {
            res.status(401).json({ message: error?.message || 'Token validation failed' });
        }
    }
} 