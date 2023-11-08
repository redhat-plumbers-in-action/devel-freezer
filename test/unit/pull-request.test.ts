import MetadataController from 'issue-metadata';
import { describe, it, expect, beforeEach, test } from 'vitest';

import {
  pullRequestContextFixture,
  IPullRequestTestContext,
} from './fixtures/pull-request.fixture';

import { Metadata } from '../../src/metadata';
import { CustomOctokit } from '../../src/octokit';
import { PullRequest } from '../../src/pull-request';

describe('Pull Request Object', () => {
  beforeEach<IPullRequestTestContext>(context => {
    context.pullRequests = pullRequestContextFixture.pullRequests;
    context.invalid = pullRequestContextFixture.invalid;
  });

  it<IPullRequestTestContext>('can be instantiated', context =>
    context.pullRequests.map(pullRequestItem =>
      expect(pullRequestItem).toBeDefined()
    ));

  test<IPullRequestTestContext>('get metadata()', context =>
    context.pullRequests.map(pullRequestItem =>
      expect(pullRequestItem.metadata).toMatchSnapshot()
    ));

  test<IPullRequestTestContext>('isFreezed()', context =>
    context.pullRequests.map(pullRequestItem =>
      expect(pullRequestItem.isFreezed()).toMatchSnapshot()
    ));

  test<IPullRequestTestContext>('isTagPolicyCompliant()', context => {
    context.pullRequests.map(pullRequestItem => {
      expect(
        pullRequestItem.isTagPolicyCompliant(['alpha', 'beta', 'aaa'])
      ).toMatchSnapshot();
      expect(
        pullRequestItem.isTagPolicyCompliant(['^\\S*-rc\\d$'])
      ).toMatchSnapshot();
    });

    const test_pr = new PullRequest(
      0,
      {} as CustomOctokit,
      new Metadata(0, {} as MetadataController, {
        tag: undefined,
        commentID: undefined,
      })
    );

    // policy with list of tags
    expect(
      test_pr.isTagPolicyCompliant(['alpha', 'beta', 'aaa'], 'beta')
    ).toEqual(true);
    expect(
      test_pr.isTagPolicyCompliant(['alpha', 'beta', 'aaa'], 'bbb')
    ).toEqual(false);

    // policy with regular expressions
    expect(test_pr.isTagPolicyCompliant(['^\\S*-rc\\d$'], 'v250-rc1')).toEqual(
      true
    );
    expect(test_pr.isTagPolicyCompliant(['^\\S*-rc\\d$'], 'v250')).toEqual(
      false
    );
    expect(test_pr.isTagPolicyCompliant(['^\\S*-rc\\d$'], undefined)).toEqual(
      false
    );
  });
});
