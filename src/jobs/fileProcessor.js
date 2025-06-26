import { Worker } from 'bullmq';
import { redis } from '../config/redis.js';
import { updateFileStatus } from '../services/file.service.js';
import { sha256File } from '../utils/hash.util.js';
import { logger } from '../utils/logger.js';

export default function registerFileProcessor() {
  const worker = new Worker('file-processing', async job => {
    const { fileId } = job.data;
    try {
      logger.info('Processing file', fileId);
      await updateFileStatus(fileId, { status: 'processing' });

      const hash = await sha256File(job.data.storage_path || job.data.filePath || job.data.path || '');
      await updateFileStatus(fileId, { status: 'processed', extracted_data: hash });
      return { hash };
    } catch (err) {
      logger.error(err);
      await updateFileStatus(fileId, { status: 'failed', extracted_data: err.message });
      throw err;
    }
  }, { connection: redis });

  worker.on('completed', (job) => logger.info(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => logger.error(`Job ${job.id} failed:`, err));
}
