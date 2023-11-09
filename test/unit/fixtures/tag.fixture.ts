import { Tag } from '../../../src/tag';

export interface ITagTestContext {
  tags: Tag[];
  tagPolicy: string[][];
}

export const tagContextFixture: ITagTestContext = {
  tags: [
    new Tag('v0.0.1'),
    new Tag('v1'),
    new Tag('latest'),
    new Tag('v1-rc1'),
    new Tag('v1-beta'),
    new Tag('alpha'),
    new Tag('beta'),
    new Tag('rc1'),
  ],

  tagPolicy: [['^S*-rcd$'], ['alpha', 'beta'], ['latest']],
};
