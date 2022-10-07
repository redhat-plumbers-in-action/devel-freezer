import { describe, it, expect, beforeEach } from 'vitest';

import {
  metadataContextFixture,
  IMetadataTestContext,
} from './fixtures/metadata.fixture';

describe('Metadata Object', () => {
  beforeEach<IMetadataTestContext>(context => {
    context.metadata = metadataContextFixture.metadata;
    context.invalid = metadataContextFixture.invalid;
  });

  it<IMetadataTestContext>('can be instantiated', context => {
    context.metadata.map(item => expect(item).toBeDefined());
  });
});
