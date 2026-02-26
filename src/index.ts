import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { 
  authRouter, 
  guvernmentEntityRouter, 
  userRouter, 
  formRouter, 
  topicRouter, 
  fieldRouter,
  rolRouter,
  formDataRouter 
} from "@/routes";
import { expressjwt } from 'express-jwt'
import { SECRET_KEY } from '@/utils/jwt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');
app.use(express.json());
app.use(express.static(publicPath))
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(expressjwt({
  secret:SECRET_KEY,
  algorithms:['HS256']
}).unless({
  path:[
    '/api/v1/auth/login',
    '/',
    '/api/v1/user/register'
  ]
})
)
app.get('/', (_req: Request, res: Response) => {
  res.send('¡Hola! servidor funcionando')
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/guvernment-entity",guvernmentEntityRouter)
app.use("/api/v1/form",formRouter)
app.use("/api/v1/form-data",formDataRouter)
app.use("/api/v1/topic",topicRouter)
app.use("/api/v1/field",fieldRouter)
app.use("/api/v1/rol",rolRouter)

app.use((err:any, req:Request, res:Response, next:Function) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({ message: 'Token invalido o no proporcionado' });
  } else {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default app;