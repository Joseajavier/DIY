import Constants from 'expo-constants';

const BASE_URL: string =
  Constants.expoConfig?.extra?.apiUrl ??
  (__DEV__ ? 'http://localhost:3001' : 'https://diy-backend.up.railway.app');

const TIMEOUT_MS = 30000; // 30 seconds
const MAX_RETRIES = 2;    // retry 2 veces tras fallo transitorio
const BASE_DELAY_MS = 500; // backoff exponencial: 500ms, 1000ms

async function request<T>(endpoint: string, body: any): Promise<T> {
  let lastErr: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      await new Promise<void>((r) => setTimeout(r, BASE_DELAY_MS * 2 ** (attempt - 1)));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: 'Unknown error' }));
        const msg = errorBody.error || `HTTP ${response.status}`;
        // Solo reintentar en errores de servidor (5xx)
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          lastErr = new Error(msg);
          continue;
        }
        throw new Error(msg);
      }

      return response.json();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error('Timeout: la solicitud tardó demasiado');
      }
      // Reintentar en errores de red transitories
      if (attempt < MAX_RETRIES) {
        lastErr = err;
        continue;
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastErr ?? new Error('Request failed');
}

// ── DIY with AI ──
export interface AIGenerateDIYRequest {
  prompt: string;
  language?: string;
}

export interface AIGenerateDIYResponse {
  projectName: string;
  summary: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  steps: { number: number; title: string; description: string }[];
  materials: { name: string; quantity: number; unit: string }[];
  tools: { name: string; optional: boolean }[];
}

export function generateDIYWithAI(req: AIGenerateDIYRequest): Promise<AIGenerateDIYResponse> {
  return request('/ai/diy-generate', req);
}

// ── PRO with AI + Tools ──
export interface AIProPlanRequest {
  pieces: { width: number; height: number; quantity: number }[];
  boardWidth: number;
  boardHeight: number;
  projectContext?: string;
  language?: string;
}

export interface AIProPlanResponse {
  explanation: string;
  toolResults: {
    optimizeCuts?: any;
    estimateMaterials?: any;
    compareStoreOptions?: any;
  };
}

export function generateProPlanWithAI(req: AIProPlanRequest): Promise<AIProPlanResponse> {
  return request('/ai/pro-plan', req);
}

// ── Health check ──
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
