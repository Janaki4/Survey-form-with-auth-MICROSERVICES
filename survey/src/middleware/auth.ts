import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserInfo } from '../types/auth.types';

// Use the same secret as auth service
const JWT_SECRET = 'your-super-secret-jwt-key-123';

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: UserInfo;
}

// Define the JWT payload type
interface JWTPayload extends UserInfo {
  tokenType: 'access' | 'refresh';
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // if(token == "bypass") {
  //   next()
  // }

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    console.log('Decoded token:', decoded); // Debug log
    
    // Verify that this is an access token
    if (decoded.tokenType !== 'access') {
      res.status(403).json({ error: 'Invalid token type' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log('Token verification error:', error); // Debug log
    
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ error: 'Invalid token' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}; 