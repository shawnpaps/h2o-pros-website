import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withPayloadReads, memoizePayloadRead } from '../src/lib/payload-request-cache.ts';

test('deduplicates concurrent and sequential identical reads within one render', async () => {
  let calls = 0;
  const load = async () => ++calls;
  await withPayloadReads(async () => {
    assert.deepEqual(await Promise.all([memoizePayloadRead('/settings', load), memoizePayloadRead('/settings', load)]), [1, 1]);
    assert.equal(await memoizePayloadRead('/settings', load), 1);
    assert.equal(await memoizePayloadRead('/settings?depth=0', load), 2);
  });
  assert.equal(calls, 2);
});

test('isolates overlapping renders and refreshes on later requests', async () => {
  const render = (value) => withPayloadReads(async () => {
    const first = await memoizePayloadRead('/settings', async () => value);
    await new Promise(resolve => setTimeout(resolve, 5));
    return [first, await memoizePayloadRead('/settings', async () => 'wrong')];
  });
  assert.deepEqual(await Promise.all([render('a'), render('b')]), [['a', 'a'], ['b', 'b']]);
  assert.deepEqual(await render('fresh'), ['fresh', 'fresh']);
});

test('failures do not persist into the next request; outside requests is uncached', async () => {
  await assert.rejects(withPayloadReads(() => memoizePayloadRead('/settings', async () => { throw new Error('offline'); })), /offline/);
  assert.equal(await withPayloadReads(() => memoizePayloadRead('/settings', async () => 'recovered')), 'recovered');
  let calls = 0;
  await memoizePayloadRead('/settings', async () => ++calls);
  await memoizePayloadRead('/settings', async () => ++calls);
  assert.equal(calls, 2);
});
