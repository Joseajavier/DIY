// ═══════════════════════════════════════════════════════════════
// useScrollMemory — restaura el scroll Y de una lista entre visitas.
// ───────────────────────────────────────────────────────────────
// Problema:
//   React Navigation (native-stack) mantiene los screens en la pila
//   y preserva su estado mientras no se haga pop. Pero cuando el
//   usuario navega a ToolSearch desde Home una segunda vez, es un
//   mount nuevo y el scroll vuelve a 0.
//
// Solución:
//   Guardamos el último offset por `key` en un Map módulo-global y
//   lo restauramos al montar (o al volver a enfocar la pantalla).
//   Idempotente, sin side-effects sobre Navigation.
//
// Uso:
//   const { onScroll, scrollRef } = useScrollMemory<FlatList>('ToolSearch');
//   <FlatList ref={scrollRef} onScroll={onScroll} ... />
// ═══════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';

// Store módulo-global. Se limpia al hacer hot-reload completo.
const scrollOffsets = new Map<string, number>();

type Scrollable = FlatList<any> | SectionList<any, any> | ScrollView;

export function useScrollMemory<T extends Scrollable>(key: string) {
  const scrollRef = useRef<T | null>(null);
  const currentOffset = useRef<number>(scrollOffsets.get(key) ?? 0);

  // Restaurar al montar si hay offset guardado (>0).
  useEffect(() => {
    const saved = scrollOffsets.get(key) ?? 0;
    if (saved <= 0) return;
    // Pequeño delay para dar tiempo a que la lista renderice contenido.
    const timer = setTimeout(() => {
      const node = scrollRef.current as any;
      if (!node) return;
      if (typeof node.scrollToOffset === 'function') {
        node.scrollToOffset({ offset: saved, animated: false });
      } else if (typeof node.scrollTo === 'function') {
        node.scrollTo({ y: saved, animated: false });
      }
    }, 60);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistir al desmontar el último offset conocido.
  useEffect(() => {
    return () => {
      scrollOffsets.set(key, currentOffset.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      currentOffset.current = e.nativeEvent.contentOffset.y;
    },
    [],
  );

  return { scrollRef, onScroll };
}

/** Utilidad para reset manual (por ejemplo tras filtrar). */
export function resetScrollMemory(key: string): void {
  scrollOffsets.delete(key);
}
