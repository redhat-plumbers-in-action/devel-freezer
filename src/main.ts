import { getInput, setFailed } from '@actions/core';

import '@total-typescript/ts-reset';

import action from './action';
import { getOctokit } from './octokit';
import { PullRequest } from './pull-request';
import { inputPrNumberSchema } from './schema/inputs';

const octokit = getOctokit(getInput('token', { required: true }));

const prMetadataUnsafe = getInput('pr-number', { required: true });

const prMetadata = inputPrNumberSchema.parse(prMetadataUnsafe);

try {
  const pr = new PullRequest(prMetadata, octokit);
  await pr.initialize();
  await action(pr, octokit);
} catch (error) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  setFailed(message);
}
