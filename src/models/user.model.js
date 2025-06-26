import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class User extends Model { }
console.log(sequelize)

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,           // ✅ must not be undefined
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

export default User;
