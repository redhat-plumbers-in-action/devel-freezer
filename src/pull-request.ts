import { debug, warning } from '@actions/core';
import { context } from '@actions/github';

import { Metadata } from './metadata';
import { CustomOctokit } from './octokit';
import { pullRequestDataSchema } from './schema/pull-request';
import { raise } from './error';

export class PullRequest {
  labels: string[] = [];
  milestone: string | null = null;
  private _metadata: Metadata | undefined;

  constructor(
    readonly id: number,
    readonly octokit: CustomOctokit
  ) {}

  set metadata(metadata: Metadata) {
    this._metadata = metadata;
  }

  get metadata() {
    if (!this._metadata) {
      raise('Metadata is not set.');
    }

    return this._metadata;
  }

  async initialize() {
    await this.setPullRequestData();
    await this.setMetadata();
  }

  async setPullRequestData() {
    const prData = pullRequestDataSchema.parse(
      await this.octokit.request(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}',
        {
          ...context.repo,
          pull_number: this.id,
        }
      )
    );

    this.labels = prData.labels.map(label => label.name);
    this.milestone = prData.milestone ? prData.milestone.title : null;
  }

  async setMetadata() {
    this.metadata = await Metadata.getMetadata(this.id);
  }

  isFreezed(): boolean {
    return !!this.metadata.commentID && !!this.metadata.tag;
  }

  isTagPolicyCompliant(tagPolicy: string[], tag?: string): boolean {
    debug(`Checking tag policy for PR: #${this.id}`);
    const freezingTag = tag ?? this.metadata.tag;
    if (freezingTag === undefined) false;

    return tagPolicy.some(regex =>
      new RegExp(regex).test(freezingTag as string)
    );
  }

  async freeze(content: string, freezingTag: string): Promise<void> {
    debug(`Freezing PR: #${this.id}`);
    const id = await this.publishComment(content);

    this.metadata.commentID = id === undefined ? id : id.toString();
    this.metadata.tag = freezingTag;
    await this.metadata.setMetadata();
  }

  async unfreeze(content: string): Promise<void> {
    debug(`Unfreezing PR: #${this.id}`);
    const id = await this.publishComment(content);

    this.metadata.commentID = id === undefined ? id : id.toString();
    await this.metadata.setMetadata();
  }

  async publishComment(content: string): Promise<number | undefined> {
    if (this.metadata.commentID) {
      this.updateComment(content);
      return;
    }

    const commentPayload = await this.createComment(content);

    if (!commentPayload) {
      warning(`Failed to create comment.`);
      return;
    }

    return commentPayload.id;
  }

  async createComment(body: string) {
    if (!body || body === '') return;

    debug(`Creating comment for PR: #${this.id}`);

    const { data } = await this.octokit.request(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
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

    debug(`Updating comment with ID: ${this.metadata.commentID}`);

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
}
