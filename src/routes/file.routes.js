import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import * as FileController from '../controllers/file.controller.js';

const router = express.Router();
router.post('/upload', authenticateToken, upload.single('file'), FileController.uploadFile);
router.get('/files/:id', authenticateToken, FileController.getFile);

export default router;
