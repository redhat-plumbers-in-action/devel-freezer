import { describe, expect, test } from 'vitest';

import { delay } from '../../src/delay';

describe('Test delay functionality', () => {
  test('delay', async () => {
    const start = Date.now();
    await delay(4);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(4000);
  });
});
