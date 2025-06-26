import { Queue } from 'bullmq';
import { redis } from './redis.js';

export const fileQueue = new Queue('file-processing', {
  connection: redis,
});
