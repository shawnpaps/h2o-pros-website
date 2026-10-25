import { AsyncLocalStorage } from 'node:async_hooks';

const reads = new AsyncLocalStorage<{ reads: Map<string, Promise<unknown>>; strict: boolean }>();

/** Each render gets its own cache; never retain CMS content across requests. */
export const withPayloadReads = <T>(render: () => T, strict = false): T =>
  reads.run({ reads: new Map(), strict }, render);

/** Failed edit-triggered refreshes must not replace cached content with fallbacks. */
export const isStrictPayloadRead = () => reads.getStore()?.strict === true;

export const memoizePayloadRead = <T>(url: string, load: () => Promise<T>): Promise<T> => {
  const cache = reads.getStore()?.reads;
  if (!cache) return load();
  const existing = cache.get(url);
  if (existing) return existing as Promise<T>;
  const pending = Promise.resolve().then(load);
  cache.set(url, pending);
  return pending;
};
