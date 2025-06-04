import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import AppDataSource from '../config/database';

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async createUser(username: string, hashedPassword: string): Promise<User> {
    const user = this.repository.create({ username, password: hashedPassword });
    return this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.repository.update(userId, { refreshToken });
  }
} 