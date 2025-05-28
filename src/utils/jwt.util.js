import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function signJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}
