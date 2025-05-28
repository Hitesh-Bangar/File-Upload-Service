import { File } from '../models/index.js';
import { fileQueue } from '../config/bullmq.js';

export async function createFile(userId, file, metadata) {
  const record = await File.create({
    user_id: userId,
    original_filename: file.originalname,
    storage_path: file.path,
    title: metadata?.title,
    description: metadata?.description,
    status: 'uploaded'
  });

  await fileQueue.add('process', { fileId: record.id });

  return record;
}

export async function getFileById(id, userId) {
  return File.findOne({ where: { id, user_id: userId } });
}

export async function updateFileStatus(id, fields) {
  await File.update(fields, { where: { id } });
}
