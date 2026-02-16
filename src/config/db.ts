import 'reflect-metadata';
import { DataSource } from "typeorm";
import env from 'dotenv';
import { User } from '@/entities/User';
env.config();

export const AppDataSource = new DataSource({
  type:'postgres',
  host: String(process.env.DB_HOST || ''),
  port: Number(process.env.DB_PORT || 5432),
  username: String(process.env.DB_USER || ''),
  password: String(process.env.DB_PASSWORD || ''),
  database: String(process.env.DB_NAME || ''),
  synchronize:true,
  logging:false,
  entities:[User],
  migrations:[],
  subscribers:[],
})