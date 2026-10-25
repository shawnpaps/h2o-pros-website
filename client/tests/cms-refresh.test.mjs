import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { test } from 'node:test';
import { withPayloadReads } from '../src/lib/payload-request-cache.ts';

// Load the real loaders without Astro/Vite or a CMS connection. Rewrite only
// module resolution and Vite's environment object; all fetches below are mocked.
async function moduleSource(file, replacements = {}) {
  const url = new URL(file, import.meta.url);
  let source = (await readFile(url, 'utf8')).replaceAll('import.meta.env', '({})');
  source = source.replace(/from '(\.[^']+)'/g, (_, path) =>
    `from '${replacements[path] || new URL(path + '.ts', url).href}'`);
  return 'data:text/javascript;base64,' + Buffer.from(stripTypeScriptTypes(source)).toString('base64');
}

test('CMS errors preserve normal fallback behavior but fail authenticated refreshes', async () => {
  const oldFetch = globalThis.fetch;
  const oldURL = process.env.PAYLOAD_URL;
  process.env.PAYLOAD_URL = 'https://cms.invalid';
  try {
    const cms = await import(await moduleSource('../src/lib/cms.ts'));
    for (const mock of [
      async () => new Response('', { status: 503 }),
      async () => { throw new Error('network unavailable'); },
      async () => new Response('invalid JSON'),
    ]) {
      globalThis.fetch = mock;
      assert.ok((await withPayloadReads(() => cms.getServices())).length > 0);
      await assert.rejects(withPayloadReads(() => cms.getServices(), true), /CMS read failed/);
    }
    globalThis.fetch = async () => Response.json({ docs: [{
      title: 'Live title', anchorId: 'test', slug: 'live', blurb: 'Live content',
    }] });
    assert.equal((await withPayloadReads(() => cms.getServices(), true))[0].title, 'Live title');
  } finally {
    globalThis.fetch = oldFetch;
    if (oldURL === undefined) delete process.env.PAYLOAD_URL;
    else process.env.PAYLOAD_URL = oldURL;
  }
});

test('a later ISR render refreshes ratings rather than reusing process-lifetime content', async () => {
  const oldFetch = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.fetch = async () => Response.json([{ source: 'google', overall_rating: ++calls, total_ratings: 10 }]);
    const cmsURL = await moduleSource('../src/lib/cms.ts');
    const reviews = await import(await moduleSource('../src/lib/reviews.ts', { './cms': cmsURL }));
    const first = await withPayloadReads(() => Promise.all([reviews.getRatingSummary(), reviews.getRatingSummary()]));
    assert.equal(first[0].average, '1.0');
    assert.equal(first[1].average, '1.0');
    assert.equal((await withPayloadReads(() => reviews.getRatingSummary())).average, '2.0');
    assert.equal(calls, 2);
  } finally { globalThis.fetch = oldFetch; }
});
