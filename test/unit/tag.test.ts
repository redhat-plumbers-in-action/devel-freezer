import { describe, it, expect, beforeEach, test } from 'vitest';

import { tagContextFixture, ITagTestContext } from './fixtures/tag.fixture';

describe('Tag Object', () => {
  beforeEach<ITagTestContext>(context => {
    context.tags = tagContextFixture.tags;
    context.tagPolicy = tagContextFixture.tagPolicy;
  });

  it<ITagTestContext>('can be instantiated', context =>
    context.tags.map(tagsItem => expect(tagsItem).toBeDefined()));

  test<ITagTestContext>('get latest()', context =>
    context.tags.map(tagsItem => expect(tagsItem.latest).toMatchSnapshot()));

  test<ITagTestContext>('isFreezed()', context =>
    context.tags.map(tagsItem =>
      context.tagPolicy.map(tagPolicyItem =>
        expect(tagsItem.isFreezed(tagPolicyItem)).toMatchSnapshot()
      )
    ));
});
