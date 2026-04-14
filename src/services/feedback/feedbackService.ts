const BASE_URL = __DEV__ ? 'http://localhost:3001' : 'https://diy-backend.up.railway.app';

export interface FeedbackPayload {
  message: string;
  type: 'bug' | 'suggestion' | 'other';
  contactEmail?: string;
  appVersion: string;
  platform: string;
}

export async function sendFeedback(payload: FeedbackPayload): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}
