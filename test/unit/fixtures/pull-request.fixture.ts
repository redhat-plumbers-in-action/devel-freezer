import { Metadata } from '../../../src/metadata';
import { PullRequest } from '../../../src/pull-request';

export interface IPullRequestTestContext {
  pullRequests: PullRequest[];
  invalid: PullRequest[];
}

export const pullRequestContextFixture: IPullRequestTestContext = {
  pullRequests: [
    new PullRequest(new Metadata({ tag: undefined, commentID: undefined })),
    new PullRequest(new Metadata({ tag: 'v1', commentID: undefined })),
    new PullRequest(new Metadata({ tag: undefined, commentID: '123456789' })),
    new PullRequest(new Metadata({ tag: 'v1', commentID: '123456789' })),

    new PullRequest(new Metadata({ tag: 'alpha', commentID: undefined })),
    new PullRequest(new Metadata({ tag: 'beta', commentID: undefined })),
    new PullRequest(new Metadata({ tag: 'v250-rc1', commentID: undefined })),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(null),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(undefined),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(''),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest([]),
  ],
};
