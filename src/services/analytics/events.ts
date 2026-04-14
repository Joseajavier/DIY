type EventName =
  | 'app_opened'
  | 'mode_selected'
  | 'diy_request_started'
  | 'diy_request_succeeded'
  | 'diy_request_failed'
  | 'pro_request_started'
  | 'pro_request_succeeded'
  | 'pro_request_failed'
  | 'project_saved'
  | 'project_reopened'
  | 'project_deleted'
  | 'project_duplicated'
  | 'project_shared'
  | 'fallback_used'
  | 'feedback_sent'
  | 'language_changed'
  | 'settings_opened';

interface AnalyticsEvent {
  name: EventName;
  timestamp: string;
  props?: Record<string, string | number | boolean>;
}

// In-memory queue — flush to backend periodically or on demand
const queue: AnalyticsEvent[] = [];

export function trackEvent(name: EventName, props?: Record<string, string | number | boolean>) {
  const event: AnalyticsEvent = {
    name,
    timestamp: new Date().toISOString(),
    props,
  };

  queue.push(event);

  if (__DEV__) {
    console.log('[Analytics]', name, props || '');
  }

  // Auto-flush every 10 events
  if (queue.length >= 10) {
    flushEvents();
  }
}

export async function flushEvents() {
  if (queue.length === 0) return;

  const batch = [...queue];
  queue.length = 0;

  try {
    // Send to backend — endpoint created in backend changes below
    const baseUrl = __DEV__ ? 'http://localhost:3001' : 'https://diy-backend.up.railway.app';
    await fetch(`${baseUrl}/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
    });
  } catch {
    // Re-queue on failure
    queue.unshift(...batch);
  }
}
