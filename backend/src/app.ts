import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import aiRoutes from './routes/ai';
import feedbackRoutes from './routes/feedback';
import analyticsRoutes from './routes/analytics';
import catalogRoutes from './routes/catalog';
import { errorHandler } from './utils/errors';

const app = express();

app.use(cors());
app.use(express.json());

// Rate limiting — 30 requests per minute for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests. Try again in a minute.' },
});

// General rate limiting — 100 requests per minute
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

app.use(generalLimiter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'diy-backend' });
});

// Routes
app.use('/ai', aiLimiter, aiRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/catalog', catalogRoutes);

// Error handler
app.use(errorHandler);

export default app;
