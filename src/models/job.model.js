import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import File from './file.model.js';

class Job extends Model { }
Job.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  file_id: { type: DataTypes.INTEGER, allowNull: false },
  job_type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, allowNull: false },
  error_message: { type: DataTypes.TEXT },
  started_at: { type: DataTypes.DATE },
  completed_at: { type: DataTypes.DATE }
}, { sequelize, modelName: 'jobs', timestamps: false });

File.hasOne(Job, { foreignKey: 'file_id' });
Job.belongsTo(File, { foreignKey: 'file_id' });

export default Job;
