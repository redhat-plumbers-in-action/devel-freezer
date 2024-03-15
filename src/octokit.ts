import { Octokit } from '@octokit/core';
import { config } from '@probot/octokit-plugin-config';

export const CustomOctokit = Octokit.plugin(config);

export type CustomOctokit = InstanceType<typeof CustomOctokit>;

export function getOctokit(token: string): CustomOctokit {
  return new CustomOctokit({
    auth: token,
  });
}
