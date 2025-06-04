import { UserInfo } from '../services/survey.service';

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
    }
  }
} 