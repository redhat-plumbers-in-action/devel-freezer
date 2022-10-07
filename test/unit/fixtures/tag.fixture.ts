import { Tag } from '../../../src/tag';

export interface ITagTestContext {
  tags: Tag[];
  invalid: Tag[];
}

export const tagContextFixture: ITagTestContext = {
  tags: [
    new Tag('v0.0.1'),
    new Tag('v1'),
    new Tag('latest'),
    new Tag('v1-rc1'),
    new Tag('v1-beta'),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Tag(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Tag(null),
    new Tag(undefined),
    new Tag(''),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Tag({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Tag([]),
  ],
};
