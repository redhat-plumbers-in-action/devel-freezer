import { Context } from 'probot';

import { events } from './events';

interface IMetadataObject {
  tag: string | undefined;
  commentID: string | undefined;
}

export class Metadata {
  private _tag: IMetadataObject['tag'];
  private _commentID: IMetadataObject['commentID'];

  constructor(metadata: IMetadataObject) {
    this._tag = metadata?.tag ?? undefined;
    this._commentID = metadata?.commentID ?? undefined;
  }

  get tag() {
    return this._tag;
  }

  set tag(value: IMetadataObject['tag']) {
    this._tag = value;
  }

  get commentID() {
    return this._commentID;
  }

  set commentID(value: IMetadataObject['commentID']) {
    if (this._commentID === undefined) {
      this._commentID = value;
    }
  }

  async setMetadata(
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    if (this.commentID !== undefined) {
      await MetadataController.setMetadata(
        Metadata.metadataCommentID,
        this.commentID ?? '',
        context as unknown as Context
      );
    }

    // TODO: clear tag when un-freezed
    await MetadataController.setMetadata(
      Metadata.metadataFreezingTag,
      this.tag ?? '',
      context as unknown as Context
    );
  }

  static readonly metadataFreezingTag = 'freezing-tag';
  static readonly metadataCommentID = 'comment-id';

  static async getMetadata(
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    return new Metadata({
      tag: await (MetadataController.getMetadata(
        Metadata.metadataFreezingTag.toString(),
        context as unknown as Context
      ) as Promise<IMetadataObject['tag']>),
      commentID: await (MetadataController.getMetadata(
        Metadata.metadataCommentID.toString(),
        context as unknown as Context
      ) as Promise<IMetadataObject['commentID']>),
    });
  }
}

/**
 * Based on probot-metadata - https://github.com/probot/metadata
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MetadataController {
  static readonly regex = /\n\n<!-- devel-freezer = (.*) -->/;

  static async getMetadata(key: string, context: Context) {
    const body =
      (await context.octokit.issues.get(context.issue())).data.body || '';

    const match = body.match(MetadataController.regex);

    if (match) {
      const data = JSON.parse(match[1]);
      return key ? data && data[key] : data;
    }
  }

  static async setMetadata(
    key: string,
    value: string,
    context: Context,
    issueNumber?: number
  ) {
    let body =
      (
        await context.octokit.issues.get(
          context.issue(issueNumber ? { issue_number: issueNumber } : {})
        )
      ).data.body || '';

    let data = {};

    body = body.replace(MetadataController.regex, (_, json) => {
      data = JSON.parse(json);
      return '';
    });

    if (!data) data = {};

    if (typeof key === 'object') {
      Object.assign(data, key);
    } else {
      (data as { [key: string]: string })[key] = value;
    }

    return context.octokit.issues.update(
      context.issue({
        body: `${body}\n\n<!-- devel-freezer = ${JSON.stringify(data)} -->`,
        ...(issueNumber ? { issue_number: issueNumber } : {}),
      })
    );
  }
}
