// Normalize any error into a human-readable message
export function normalizeError(error: unknown): string {
  if (error instanceof Error) {
    const msg = error.message;
    // Network errors
    if (msg.includes('Network request failed') || msg.includes('fetch')) {
      return 'Sin conexión a internet. Comprueba tu red.';
    }
    if (msg.includes('timeout') || msg.includes('Timeout')) {
      return 'La solicitud tardó demasiado. Inténtalo de nuevo.';
    }
    if (msg.includes('500') || msg.includes('Internal')) {
      return 'Error en el servidor. Inténtalo de nuevo.';
    }
    if (msg.includes('429') || msg.includes('Too many')) {
      return 'Demasiadas solicitudes. Espera un momento.';
    }
    if (msg.includes('SQLite') || msg.includes('database')) {
      return 'Error guardando datos. Reinicia la app.';
    }
    return msg;
  }
  if (typeof error === 'string') return error;
  return 'Error desconocido. Inténtalo de nuevo.';
}
