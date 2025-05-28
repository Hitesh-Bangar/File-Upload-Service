import * as AuthService from '../services/auth.service.js';

export async function login(req, res) {
  const { email, password } = req.body;
  const token = await AuthService.login(email, password);
  if (!token) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token });
}
