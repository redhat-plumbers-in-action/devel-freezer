import {
  PullRequestOpenedEvent,
  PullRequestReopenedEvent,
  PullRequestSynchronizeEvent,
} from '@octokit/webhooks-types';

import payloadPullRequestOpened from '../fixtures/payloads/pull-request-opened.json';
import payloadPullRequestReopened from '../fixtures/payloads/pull-request-reopened.json';
import payloadPullRequestSynchronize from '../fixtures/payloads/pull-request-synchronize.json';

export interface IMetadataTestContext {
  payloads: (
    | PullRequestOpenedEvent
    | PullRequestReopenedEvent
    | PullRequestSynchronizeEvent
  )[];
}

export const metadataContextFixture: IMetadataTestContext = {
  payloads: [
    payloadPullRequestOpened as PullRequestOpenedEvent,
    payloadPullRequestReopened as PullRequestReopenedEvent,
    payloadPullRequestSynchronize as PullRequestSynchronizeEvent,
  ],
};
