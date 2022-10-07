import { Context } from 'probot';

import { events } from './events';

export class Tag {
  private _latest: string | undefined;

  constructor(tag: string | undefined) {
    this._latest = tag;
  }

  get latest() {
    return this._latest;
  }

  isFreezed(tagPolicy: string[]) {
    if (this.latest === undefined) false;

    return tagPolicy.some(regex =>
      new RegExp(regex).test(this.latest as string)
    );
  }

  static async getLatestTag(
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    const tags = (await context.octokit.rest.repos.listTags(context.repo()))
      .data;

    if (!tags || tags.length <= 0) return undefined;

    return tags.shift()?.name;
  }
}
