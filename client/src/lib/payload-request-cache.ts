import { AsyncLocalStorage } from 'node:async_hooks';

const reads = new AsyncLocalStorage<Map<string, Promise<unknown>>>();

/** Each render gets its own cache; never retain CMS content across requests. */
export const withPayloadReads = <T>(render: () => T): T =>
  reads.run(new Map(), render);

export const memoizePayloadRead = <T>(url: string, load: () => Promise<T>): Promise<T> => {
  const cache = reads.getStore();
  if (!cache) return load();
  const existing = cache.get(url);
  if (existing) return existing as Promise<T>;
  const pending = Promise.resolve().then(load);
  cache.set(url, pending);
  return pending;
};
