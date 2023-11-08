import { getInput } from '@actions/core';
import { context } from '@actions/github';
import MetadataController from 'issue-metadata';
import { z } from 'zod';

type MetadataObject = {
  tag: string | undefined;
  commentID: string | undefined;
};

export class Metadata {
  private _tag: MetadataObject['tag'];
  private _commentID: MetadataObject['commentID'];

  constructor(
    readonly issueNumber: number,
    readonly controller: MetadataController,
    metadata: MetadataObject
  ) {
    this._tag = metadata?.tag ?? undefined;
    this._commentID = metadata?.commentID ?? undefined;
  }

  get tag() {
    return this._tag;
  }

  set tag(value: MetadataObject['tag']) {
    this._tag = value;
  }

  get commentID() {
    return this._commentID;
  }

  set commentID(value: MetadataObject['commentID']) {
    if (this._commentID === undefined) {
      this._commentID = value;
    }
  }

  static readonly metadataFreezingTag = 'freezing-tag';
  static readonly metadataCommentID = 'comment-id';

  async setMetadata() {
    if (this.commentID !== undefined) {
      await this.controller.setMetadata(
        this.issueNumber,
        Metadata.metadataCommentID,
        this.commentID ?? ''
      );
    }

    // TODO: clear tag when un-freezed
    await this.controller.setMetadata(
      this.issueNumber,
      Metadata.metadataFreezingTag,
      this.tag ?? ''
    );
  }

  static async getMetadata(issueNumber: number) {
    const controller = new MetadataController('devel-freezer', {
      ...context.repo,
      headers: {
        authorization: `Bearer ${getInput('token', { required: true })}`,
      },
    });

    const parsedTag = z
      .string()
      .safeParse(
        await controller.getMetadata(issueNumber, Metadata.metadataFreezingTag)
      );
    const parsedCommentID = z
      .string()
      .safeParse(
        await controller.getMetadata(issueNumber, Metadata.metadataCommentID)
      );

    return new Metadata(issueNumber, controller, {
      tag: parsedTag.success ? parsedTag.data : undefined,
      commentID: parsedCommentID.success ? parsedCommentID.data : undefined,
    });
  }
}
