import {
  PullRequestOpenedEvent,
  PullRequestReopenedEvent,
  PullRequestSynchronizeEvent,
} from '@octokit/webhooks-types';

import { events } from '../../../src/events';

import payloadPullRequestOpened from '../fixtures/payloads/pull-request-opened.json';
import payloadPullRequestReopened from '../fixtures/payloads/pull-request-reopened.json';
import payloadPullRequestSynchronize from '../fixtures/payloads/pull-request-synchronize.json';

export interface IMetadataTestContext {
  payloads: {
    type: typeof events.pull_request[number];
    payload:
      | PullRequestOpenedEvent
      | PullRequestReopenedEvent
      | PullRequestSynchronizeEvent;
  }[];
}

export const metadataContextFixture: IMetadataTestContext = {
  payloads: [
    {
      type: 'pull_request.opened',
      payload: payloadPullRequestOpened as PullRequestOpenedEvent,
    },
    {
      type: 'pull_request.reopened',
      payload: payloadPullRequestReopened as PullRequestReopenedEvent,
    },
    {
      type: 'pull_request.synchronize',
      payload: payloadPullRequestSynchronize as PullRequestSynchronizeEvent,
    },
  ],
};
