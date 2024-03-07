import { debug, warning, getInput } from '@actions/core';

import { Config } from './config';
import { CustomOctokit } from './octokit';
import { PullRequest } from './pull-request';
import { Tag } from './tag';
import { delay } from './delay';

import { inputDelaySchema } from './schema/inputs';

async function action(octokit: CustomOctokit): Promise<void> {
  const delayParsed = inputDelaySchema.safeParse(getInput('delay'));
  const delaySeconds = delayParsed.success ? delayParsed.data : 0;

  if (delaySeconds > 0) {
    await delay(delaySeconds);
  }

  const config = await Config.getConfig(octokit);

  const tag = new Tag(await Tag.getLatestTag());

  if (!tag.latest) {
    warning(`Repository doesn't have any tags or releases published.`);
    return;
  }

  debug(`Latest tag is: '${tag.latest}'`);

  const pullRequest = await PullRequest.getPullRequest(
    +getInput('pr-number'),
    octokit
  );

  for (const policyItem of config.policy) {
    if (!tag.isFreezed(policyItem.tags)) {
      continue;
    }

    await pullRequest.freeze(policyItem.feedback['frozen-state'], tag.latest);
    return;
  }

  if (!pullRequest.isFreezed()) {
    return;
  }

  for (const policyItem of config.policy) {
    if (!pullRequest.isTagPolicyCompliant(policyItem.tags)) {
      continue;
    }

    await pullRequest.unfreeze(policyItem.feedback['unfreeze-state']);
    return;
  }

  debug(
    `The latest tag doesn't match the requirements for a development freeze.`
  );
}

export default action;
