import MetadataController from 'issue-metadata';

import { Metadata } from '../../../src/metadata';

export interface IMetadataTestContext {
  metadata: Metadata[];
}

const controller = {} as MetadataController;

export const metadataContextFixture: IMetadataTestContext = {
  metadata: [
    new Metadata(0, controller, { tag: undefined, commentID: undefined }),
    new Metadata(0, controller, { tag: 'v1', commentID: undefined }),
    new Metadata(0, controller, { tag: undefined, commentID: '123456789' }),
    new Metadata(0, controller, { tag: 'v1', commentID: '123456789' }),
  ],
};
