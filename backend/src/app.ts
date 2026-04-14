import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai';
import feedbackRoutes from './routes/feedback';
import analyticsRoutes from './routes/analytics';
import { errorHandler } from './utils/errors';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'diy-backend' });
});

// Routes
app.use('/ai', aiRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/analytics', analyticsRoutes);

// Error handler
app.use(errorHandler);

export default app;
