import * as Sentry from '@sentry/react-native';

export function initSentry() {
  Sentry.init({
    dsn: '', // Set your Sentry DSN here or via env
    debug: __DEV__,
    enabled: !__DEV__,
    tracesSampleRate: 0.2,
    environment: __DEV__ ? 'development' : 'production',
  });
}

export function captureError(error: Error, context?: Record<string, any>) {
  if (context) {
    Sentry.setContext('extra', context);
  }
  Sentry.captureException(error);
}

export function captureMessage(message: string) {
  Sentry.captureMessage(message);
}

/**
 * Log no-fatal para catches que se "comen" un error pero queremos
 * rastrearlo en prod y verlo en la consola en dev. Usa breadcrumb
 * + message level=warning, no captureException (que ensucia Issues
 * con cosas recuperables como "backend offline").
 */
export function logWarning(
  service: string,
  message: string,
  error?: unknown,
) {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.warn(`[${service}] ${message}`, error ?? '');
  }
  try {
    Sentry.addBreadcrumb({
      category: service,
      message,
      level: 'warning',
      data: error ? { error: String(error) } : undefined,
    });
  } catch {
    // sentry may not be initialized in some code paths
  }
}

export function setUser(id: string) {
  Sentry.setUser({ id });
}
