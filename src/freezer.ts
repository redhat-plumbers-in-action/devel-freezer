import { Context } from 'probot';

import { events } from './events';
import { publishComment } from './comment';

export async function freezePullRequest(
  comment: string,
  tag: string,
  context: {
    [K in keyof typeof events]: Context<typeof events[K][number]>;
  }[keyof typeof events]
) {
  await publishComment(comment, tag, context);
}
