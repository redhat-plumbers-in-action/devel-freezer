import { warning } from '@actions/core';
import { context } from '@actions/github';

import { Metadata } from './metadata';
import { CustomOctokit } from './octokit';

export class PullRequest {
  private _metadata: Metadata;

  constructor(
    readonly id: number,
    readonly octokit: CustomOctokit,
    metadata: Metadata
  ) {
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

  async freeze(content: string, freezingTag: string) {
    const id = await this.publishComment(content);

    this.metadata.commentID = id === undefined ? id : id.toString();
    this.metadata.tag = freezingTag;
    await this.metadata.setMetadata();
  }

  async unfreeze(content: string) {
    const id = await this.publishComment(content);

    this.metadata.commentID = id === undefined ? id : id.toString();
    await this.metadata.setMetadata();
  }

  async publishComment(content: string) {
    if (this.metadata.commentID) {
      this.updateComment(content);
      return;
    }

    const commentPayload = (await this.createComment(content))?.data;

    if (!commentPayload) {
      warning(`Failed to create comment.`);
      return;
    }

    return commentPayload.id;
  }

  async createComment(body: string) {
    if (!body || body === '') return;

    const { data } = await this.octokit.request(
      'POST /repos/{owner}/{repo}/issues/comments',
      {
        ...context.repo,
        issue_number: this.id,
        body,
      }
    );

    return data;
  }

  private async updateComment(body: string) {
    if (!this.metadata.commentID) return;

    const { data } = await this.octokit.request(
      'PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}',
      {
        ...context.repo,
        comment_id: +this.metadata.commentID,
        body,
      }
    );

    return data;
  }

  static async getPullRequest(id: number, octokit: CustomOctokit) {
    return new PullRequest(id, octokit, await Metadata.getMetadata(id));
  }
}
