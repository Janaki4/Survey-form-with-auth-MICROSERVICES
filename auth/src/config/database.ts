import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'janaki',
  database: process.env.DB_NAME || 'survey_form',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: [User],
  migrations: [],
  subscribers: []
});

export default AppDataSource; 