import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola! Servidor Express con TypeScript funcionando chido');
});
