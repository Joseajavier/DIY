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

export function setUser(id: string) {
  Sentry.setUser({ id });
}
