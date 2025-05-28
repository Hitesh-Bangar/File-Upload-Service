import express from 'express';
import * as HealthController from '../controllers/health.controller.js';

const router = express.Router();
router.get('/health', HealthController.health);

export default router;
