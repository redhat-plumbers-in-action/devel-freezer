import { describe, it, expect, beforeEach, test } from 'vitest';

import {
  metadataContextFixture,
  IMetadataTestContext,
} from './fixtures/metadata.fixture';

describe('Metadata Object', () => {
  beforeEach<IMetadataTestContext>(context => {
    context.metadata = metadataContextFixture.metadata;
    context.invalid = metadataContextFixture.invalid;
  });

  it<IMetadataTestContext>('can be instantiated', context =>
    context.metadata.map(metadataItem => expect(metadataItem).toBeDefined()));

  it.todo<IMetadataTestContext>(
    'is invalid' /*, async context => {
    context.invalid.map(async item =>
      expect(Metadata.validate(item)).resolves.toMatchSnapshot()
    );
  }*/
  );

  test<IMetadataTestContext>('get tag()', context =>
    context.metadata.map(metadataItem =>
      expect(metadataItem.tag).toMatchSnapshot()
    ));

  test.todo<IMetadataTestContext>('set tag()');

  test<IMetadataTestContext>('get commentID()', context =>
    context.metadata.map(metadataItem =>
      expect(metadataItem.commentID).toMatchSnapshot()
    ));

  test.todo<IMetadataTestContext>('set commentID()');

  test.todo<IMetadataTestContext>('getMetadata()');
  test.todo<IMetadataTestContext>('setMetadata()');
});
