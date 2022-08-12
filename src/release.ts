import { Context } from 'probot';

import { events } from './events';

export async function getLatestTag(
  context: {
    [K in keyof typeof events]: Context<typeof events[K][number]>;
  }[keyof typeof events]
) {
  const tags = (await context.octokit.rest.repos.listTags(context.repo())).data;

  if (!tags || tags.length <= 0) return undefined;

  return tags.shift()?.name;
}

export function isTagFreezed(tag: string, policy: string[]) {
  return policy.some(regex => new RegExp(regex).test(tag));
}
