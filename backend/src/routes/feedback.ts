import { Router, Request, Response } from 'express';

const router = Router();

// POST /feedback
router.post('/', (req: Request, res: Response) => {
  const { message, type, contactEmail, appVersion, platform } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'message is required' });
    return;
  }

  // Log feedback (in production, save to DB or send to Slack/email)
  console.log('[FEEDBACK]', {
    type: type || 'other',
    message: message.substring(0, 500),
    contactEmail,
    appVersion,
    platform,
    timestamp: new Date().toISOString(),
  });

  res.json({ ok: true });
});

export default router;
