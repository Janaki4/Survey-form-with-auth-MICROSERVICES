export interface UserInfo {
  id: string;
  username: string;
  role: string;
  tokenType: 'access' | 'refresh';
  iat?: number;
  exp?: number;
} 