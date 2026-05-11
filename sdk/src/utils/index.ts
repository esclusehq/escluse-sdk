export function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, delay = 1000, backoff = 2, onRetry } = options;
  
  return new Promise((resolve, reject) => {
    let attempt = 0;
    
    const attemptFn = async () => {
      attempt++;
      try {
        resolve(await fn());
      } catch (error) {
        if (attempt >= maxAttempts) {
          reject(error);
          return;
        }
        onRetry?.(attempt, error as Error);
        setTimeout(attemptFn, delay * Math.pow(backoff, attempt - 1));
      }
    };
    
    attemptFn();
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}