import { Metadata } from '../../../src/metadata';

export interface IMetadataTestContext {
  metadata: Metadata[];
  invalid: Metadata[];
}

export const metadataContextFixture: IMetadataTestContext = {
  metadata: [new Metadata({ tag: undefined, commentID: undefined })],

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
  ],
};
