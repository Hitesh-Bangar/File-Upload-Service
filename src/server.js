import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';

import app from './app.js';
import { sequelize, User } from './models/index.js';

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.sync({ alter: true });

  const email = 'demo@example.com';
  const password = 'password';
  const hashed = await bcrypt.hash(password, 10);
  await User.findOrCreate({ where: { email }, defaults: { password: hashed } });

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start();
