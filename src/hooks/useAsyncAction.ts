import { useState, useCallback, useRef } from 'react';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export function useAsyncAction<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  });
  const lockRef = useRef(false);

  const execute = useCallback(async (fn: () => Promise<T>): Promise<T | null> => {
    if (lockRef.current) return null; // prevent double tap
    lockRef.current = true;

    setState({ status: 'loading', data: null, error: null, isLoading: true, isError: false, isSuccess: false });

    try {
      const result = await fn();
      setState({ status: 'success', data: result, error: null, isLoading: false, isError: false, isSuccess: true });
      lockRef.current = false;
      return result;
    } catch (err: any) {
      const msg = err?.message || 'Error desconocido';
      setState({ status: 'error', data: null, error: msg, isLoading: false, isError: true, isSuccess: false });
      lockRef.current = false;
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: 'idle', data: null, error: null, isLoading: false, isError: false, isSuccess: false });
    lockRef.current = false;
  }, []);

  return { ...state, execute, reset };
}
