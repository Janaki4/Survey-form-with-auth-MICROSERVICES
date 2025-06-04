import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

// Use a consistent secret across services
const JWT_SECRET = 'your-super-secret-jwt-key-123';
const REFRESH_TOKEN_SECRET = 'your-super-secret-jwt-key-123';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(username: string, password: string): Promise<{ user: User }> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Store password as is (not recommended for production)
    const user = await this.userRepository.createUser(username, password);
    return { user };
  }

  async login(username: string, password: string): Promise<{ user: User; accessToken: string }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Simple password comparison (not recommended for production)
    if (password !== user.password) {
      throw new Error('Invalid credentials');
    }

    // Generate both tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Store refresh token in database
    await this.userRepository.updateRefreshToken(user.id, refreshToken);

    return { user, accessToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { id: string; tokenType: string };
      
      if (decoded.tokenType !== 'refresh') {
        throw new Error('Invalid token type');
      }

      // Verify refresh token exists in database
      const user = await this.userRepository.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.refreshToken || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      const accessToken = this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async validateAccessToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; tokenType: string };
      
      if (decoded.tokenType !== 'access') {
        throw new Error('Invalid token type');
      }

      const user = await this.userRepository.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      { 
        id: user.id,
        username: user.username,
        role: user.role,
        tokenType: 'access'
      },
      JWT_SECRET,
      { expiresIn: '15m' } // Access token expires in 15 minutes
    );
  }

  private generateRefreshToken(user: User): string {
    return jwt.sign(
      { 
        id: user.id,
        tokenType: 'refresh'
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' } // Refresh token expires in 7 days
    );
  }
} 