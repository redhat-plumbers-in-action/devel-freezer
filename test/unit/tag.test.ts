import { describe, it, expect, beforeEach } from 'vitest';

import { tagContextFixture, ITagTestContext } from './fixtures/tag.fixture';

describe('Tag Object', () => {
  beforeEach<ITagTestContext>(context => {
    context.tags = tagContextFixture.tags;
    context.invalid = tagContextFixture.invalid;
  });

  it<ITagTestContext>('can be instantiated', context => {
    context.tags.map(item => expect(item).toBeDefined());
  });
});
