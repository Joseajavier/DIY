import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai';
import { errorHandler } from './utils/errors';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'diy-backend' });
});

// AI routes
app.use('/ai', aiRoutes);

// Error handler
app.use(errorHandler);

export default app;
