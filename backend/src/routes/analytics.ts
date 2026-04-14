import { Router, Request, Response } from 'express';

const router = Router();

// POST /analytics/events
router.post('/events', (req: Request, res: Response) => {
  const { events } = req.body;

  if (!Array.isArray(events)) {
    res.status(400).json({ error: 'events array is required' });
    return;
  }

  // Log analytics (in production, push to analytics DB or service)
  for (const event of events) {
    console.log('[ANALYTICS]', event.name, event.props || '', event.timestamp);
  }

  res.json({ ok: true, received: events.length });
});

export default router;
