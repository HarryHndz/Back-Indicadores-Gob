import jwt from 'jsonwebtoken';

export const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): object | string => {
  return jwt.verify(token, SECRET_KEY);
};
