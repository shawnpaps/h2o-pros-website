import { defineMiddleware } from 'astro:middleware';
import { withPayloadReads } from './lib/payload-request-cache';

export const onRequest = defineMiddleware((context, next) => {
  const secret = process.env.WEBSITE_REVALIDATION_SECRET;
  const strict = Boolean(!context.isPrerendered && secret && secret.length >= 32 &&
    context.request.headers.get('x-h2o-content-refresh') === secret);
  return withPayloadReads(() => next(), strict);
});
