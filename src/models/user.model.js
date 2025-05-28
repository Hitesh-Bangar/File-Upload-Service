import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {}
User.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });

export default User;
