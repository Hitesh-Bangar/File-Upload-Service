import * as FileService from '../services/file.service.js';

export async function uploadFile(req, res) {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file provided' });

  const { title, description } = req.body;
  const record = await FileService.createFile(req.user.id, file, { title, description });

  res.json({ id: record.id, status: record.status });
}

export async function getFile(req, res) {
  const { id } = req.params;
  const record = await FileService.getFileById(id, req.user.id);
  if (!record) return res.sendStatus(404);
  res.json(record);
}
