import MetadataController from 'issue-metadata';

import { Metadata } from '../../../src/metadata';
import { CustomOctokit } from '../../../src/octokit';
import { PullRequest } from '../../../src/pull-request';

export interface IPullRequestTestContext {
  pullRequests: PullRequest[];
}

const controller = {} as MetadataController;
const octokit = {} as CustomOctokit;

export const pullRequestContextFixture: IPullRequestTestContext = {
  pullRequests: [
    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: undefined, commentID: undefined })
    ),
    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: 'v1', commentID: undefined })
    ),
    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: undefined, commentID: '123456789' })
    ),
    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: 'v1', commentID: '123456789' })
    ),

    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: 'alpha', commentID: undefined })
    ),
    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: 'beta', commentID: undefined })
    ),
    new PullRequest(
      0,
      octokit,
      new Metadata(0, controller, { tag: 'v250-rc1', commentID: undefined })
    ),
  ],
};
