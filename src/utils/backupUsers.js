import { sequelize } from '../models/index.js';

export async function backupUsers() {
  try {
    await sequelize.query(`
      INSERT OR IGNORE INTO users_backup (id, email, password, created_at)
      SELECT id, email, password, created_at FROM users;
    `);
    console.log("✅ User data backed up to users_backup without duplicates.");
  } catch (error) {
    console.error("❌ Error backing up users:", error);
  }
}
