import IORedis from 'ioredis';

export const redis = new IORedis({
  host: process.env.REDIS_HOST || 'localhost', // <- change this if needed
  port: 6379,
  maxRetriesPerRequest: null, // 🔥 required to avoid deprecation warning
});
