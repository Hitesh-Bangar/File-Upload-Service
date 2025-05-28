import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { signJwt } from '../utils/jwt.util.js';

export async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  return signJwt({ id: user.id, email: user.email });
}
