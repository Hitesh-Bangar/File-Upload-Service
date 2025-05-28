import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import healthRoutes from './routes/health.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', authRoutes);
app.use('/', fileRoutes);
app.use('/', healthRoutes);

app.use(errorHandler);

export default app;
