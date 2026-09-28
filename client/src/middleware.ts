import { defineMiddleware } from 'astro:middleware';
import { withPayloadReads } from './lib/payload-request-cache';

export const onRequest = defineMiddleware((_context, next) =>
  withPayloadReads(() => next()),
);
