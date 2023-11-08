import MetadataController from 'issue-metadata';

import { Metadata } from '../../../src/metadata';

export interface IMetadataTestContext {
  metadata: Metadata[];
  invalid: Metadata[];
}

const controller = {} as MetadataController;

export const metadataContextFixture: IMetadataTestContext = {
  metadata: [
    new Metadata(0, controller, { tag: undefined, commentID: undefined }),
    new Metadata(0, controller, { tag: 'v1', commentID: undefined }),
    new Metadata(0, controller, { tag: undefined, commentID: '123456789' }),
    new Metadata(0, controller, { tag: 'v1', commentID: '123456789' }),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata(null),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata(undefined),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata(''),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata([]),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata({ tag: null, commentID: null }),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Metadata({ tag: undefined, commentID: 123456789 }),
  ],
};
