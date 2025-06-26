import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.model.js';

class File extends Model { }
File.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  original_filename: { type: DataTypes.STRING, allowNull: false },
  storage_path: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'uploaded' },
  extracted_data: { type: DataTypes.TEXT }
}, { sequelize, modelName: 'files', timestamps: true, createdAt: 'uploaded_at', updatedAt: false });

User.hasMany(File, { foreignKey: 'user_id' });
File.belongsTo(User, { foreignKey: 'user_id' });

export default File;
