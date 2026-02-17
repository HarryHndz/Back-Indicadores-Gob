import express, { type Request, type Response } from 'express';
import { authRouter, userRouter } from "@/routes";
import { expressjwt } from 'express-jwt'
import { SECRET_KEY } from '@/utils/jwt';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();


app.use(express.json());
app.use(expressjwt({
  secret:SECRET_KEY,
  algorithms:['HS256']
}).unless({
  path:[
    '/api/v1/auth/login',
    '/'
  ]
})
)
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola! servidor funcionando')
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)
app.use((err:any, req:Request, res:Response, next:Function) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).send('Token invalido o no proporcionado');
  } else {
    next(err);
  }
});