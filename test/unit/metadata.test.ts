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

  it.todo<IMetadataTestContext>('is invalid');

  test<IMetadataTestContext>('get tag()', context =>
    context.metadata.map(metadataItem =>
      expect(metadataItem.tag).toMatchSnapshot()
    ));

  test<IMetadataTestContext>('set tag()', context =>
    context.metadata.map(metadataItem => {
      metadataItem.tag = 'newTag-aaa';
      expect(metadataItem.tag).toEqual('newTag-aaa');
    }));

  test<IMetadataTestContext>('get commentID()', context =>
    context.metadata.map(metadataItem =>
      expect(metadataItem.commentID).toMatchSnapshot()
    ));

  test<IMetadataTestContext>('set commentID()', context =>
    context.metadata.map(metadataItem => {
      const originalID = metadataItem.commentID;
      const hadID = originalID == undefined ? false : true;

      metadataItem.commentID = '42';
      expect(metadataItem.commentID).toEqual(hadID ? originalID : '42');
    }));

  test.todo<IMetadataTestContext>('getMetadata()');
  test.todo<IMetadataTestContext>('setMetadata()');
});
