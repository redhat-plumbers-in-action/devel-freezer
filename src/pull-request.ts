import { warning } from '@actions/core';
import { Context } from 'probot';

import { events } from './events';
import { Metadata } from './metadata';

export class PullRequest {
  private _metadata: Metadata;

  constructor(metadata: Metadata) {
    this._metadata = metadata;
  }

  get metadata() {
    return this._metadata;
  }

  isFreezed() {
    return !!this.metadata.commentID && !!this.metadata.tag;
  }

  isTagPolicyCompliant(tagPolicy: string[], tag?: string) {
    const freezingTag = tag ?? this.metadata.tag;
    if (freezingTag === undefined) false;

    return tagPolicy.some(regex =>
      new RegExp(regex).test(freezingTag as string)
    );
  }

  async freeze(
    content: string,
    freezingTag: string,
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    const id = await this.publishComment(content, context);

    this.metadata.commentID = id === undefined ? id : id.toString();
    this.metadata.tag = freezingTag;
    await this.metadata.setMetadata(context);
  }

  async unfreeze(
    content: string,
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    const id = await this.publishComment(content, context);

    this.metadata.commentID = id === undefined ? id : id.toString();
    await this.metadata.setMetadata(context);
  }

  private async publishComment(
    content: string,
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    if (this.metadata.commentID) {
      this.updateComment(content, context);
      return;
    }

    const commentPayload = (await this.createComment(content, context))?.data;

    if (!commentPayload) {
      warning(`Failed to create comment.`);
      return;
    }

    return commentPayload.id;
  }

  private createComment(
    body: string,
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    if (!body || body === '') return;

    return context.octokit.issues.createComment(
      context.issue({
        body,
      })
    );
  }

  private async updateComment(
    body: string,
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    if (!this.metadata.commentID) return;

    return context.octokit.issues.updateComment(
      context.issue({
        comment_id: +this.metadata.commentID,
        body,
      })
    );
  }

  static async getPullRequest(
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    return new PullRequest(await Metadata.getMetadata(context));
  }
}
