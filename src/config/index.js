import sequelize from './db.js';
import { redis } from './redis.js';
import { fileQueue } from './bullmq.js';

export default {
  sequelize,
  redis,
  fileQueue
};
