// ═══════════════════════════════════════════════════════════════
// ERROR BOUNDARY — evita que una excepción en cualquier pantalla
// convierta la app en una pantalla en blanco.
// ───────────────────────────────────────────────────────────────
// Captura errores de render/ciclo de vida de React, los envía a
// Sentry (si está habilitado) y muestra un fallback con botón de
// "Reintentar" que resetea el boundary.
//
// Debe montarse lo más arriba posible del árbol (dentro de
// NavigationContainer o por encima). No captura errores asíncronos
// (fetch, promesas sueltas, event handlers) — esos se reportan a
// Sentry por separado.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { captureError } from '../services/monitoring/sentry';
import ErrorState from './ErrorState';

type Props = {
  children: React.ReactNode;
  // Permite a consumidores inyectar un fallback propio (p.ej. con
  // navegación a Home en vez de sólo reset local).
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Reporta a Sentry con el component stack como contexto extra.
    captureError(error, { componentStack: info.componentStack });
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (error) {
      if (this.props.fallback) return this.props.fallback(error, this.reset);
      return (
        <ErrorState
          message={error.message || 'Ha ocurrido un error inesperado.'}
          onRetry={this.reset}
        />
      );
    }
    return this.props.children;
  }
}
