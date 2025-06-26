import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import * as FileController from '../controllers/file.controller.js';
import { File } from '../models/index.js';

const router = express.Router();
router.post('/upload', authenticateToken, upload.single('file'), FileController.uploadFile);
router.get('/files/:id', authenticateToken, FileController.getFile);

router.post('/debug-insert', async (req, res) => {
  const record = await File.create({
    user_id: 1,
    original_filename: 'test.txt',
    storage_path: '/fake/path/test.txt',
    title: 'Test File',
    description: 'This is a test',
    status: 'uploaded'
  });

  res.json(record);
});

export default router;
