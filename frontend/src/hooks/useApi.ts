import { useCallback, useEffect, useRef, useState } from 'react';
/**
 * Custom hook to handle API calls with automatic loading, error and data state management.
 *
 * @param apiFn - The async API function to call.
 * @param autoExecute - If true, executes the API call immediately on mount.
 *                      If false (default), execution must be triggered manually.
 * @param autoExecuteArgs - Arguments to pass to the API function if autoExecute is true.
 *
 * Usage:
 * - For GET requests, set autoExecute=true to fetch data on component mount.
 * - For POST/PUT/DELETE requests, keep autoExecute=false and call 'execute' manually when needed.
 */
export function useApi<T, Args extends unknown[]>(
  apiFn: (...args: Args) => Promise<T>,
  autoExecute = false,
  autoExecuteArgs: Args = [] as unknown as Args,
) {
  const apiRef = useRef(apiFn);
  const argsRef = useRef(autoExecuteArgs);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...args: Args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRef.current(...args);
      if(res !== undefined) setData(res);
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Unknown error'));
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoExecute) {
      execute(...argsRef.current);
    }
  }, [autoExecute, execute]);

  return { data, loading, error, execute };
}
