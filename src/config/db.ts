import 'reflect-metadata';
import env from 'dotenv';
import { DataSource } from "typeorm";
import { 
  User, 
  Rol, 
  GuvernmentEntity, 
  Field, 
  Form, 
  Topic, 
  TopicConfig, 
  FormData 
} from '@/entities/index';
env.config();

export const AppDataSource = new DataSource({
  type:'postgres',
  host: String(process.env.DB_HOST || ''),
  port: Number(process.env.DB_PORT || 5432),
  username: String(process.env.DB_USER || ''),
  password: String(process.env.DB_PASSWORD || ''),
  database: String(process.env.DB_NAME || ''),
  synchronize:false,
  logging:true,
  entities:[
    User, 
    Rol, 
    GuvernmentEntity, 
    Field, 
    Form, 
    Topic, 
    TopicConfig, 
    FormData
  ],
  migrations:["src/migrations/*.ts"],
  subscribers:[],
})