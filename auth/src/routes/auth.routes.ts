import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Register a new user
router.post('/register', (req, res) => authController.register(req, res));

// Login
router.post('/login', (req, res) => authController.login(req, res));

// Refresh access token
router.post('/refresh-access', (req, res) => authController.refreshAccessToken(req, res));

// Validate access token
router.get('/validate', (req, res) => authController.validateAccessToken(req, res));

export default router; 