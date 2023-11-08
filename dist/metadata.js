import { getInput } from '@actions/core';
import { context } from '@actions/github';
import MetadataController from 'issue-metadata';
import { z } from 'zod';
export class Metadata {
    constructor(issueNumber, controller, metadata) {
        var _a, _b;
        this.issueNumber = issueNumber;
        this.controller = controller;
        this._tag = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.tag) !== null && _a !== void 0 ? _a : undefined;
        this._commentID = (_b = metadata === null || metadata === void 0 ? void 0 : metadata.commentID) !== null && _b !== void 0 ? _b : undefined;
    }
    get tag() {
        return this._tag;
    }
    set tag(value) {
        this._tag = value;
    }
    get commentID() {
        return this._commentID;
    }
    set commentID(value) {
        if (this._commentID === undefined) {
            this._commentID = value;
        }
    }
    async setMetadata() {
        var _a, _b;
        if (this.commentID !== undefined) {
            await this.controller.setMetadata(this.issueNumber, Metadata.metadataCommentID, (_a = this.commentID) !== null && _a !== void 0 ? _a : '');
        }
        // TODO: clear tag when un-freezed
        await this.controller.setMetadata(this.issueNumber, Metadata.metadataFreezingTag, (_b = this.tag) !== null && _b !== void 0 ? _b : '');
    }
    static async getMetadata(issueNumber) {
        const controller = new MetadataController('devel-freezer', Object.assign(Object.assign({}, context.repo), { headers: {
                authorization: `Bearer ${getInput('token', { required: true })}`,
            } }));
        const parsedTag = z
            .string()
            .safeParse(await controller.getMetadata(issueNumber, Metadata.metadataFreezingTag));
        const parsedCommentID = z
            .string()
            .safeParse(await controller.getMetadata(issueNumber, Metadata.metadataCommentID));
        return new Metadata(issueNumber, controller, {
            tag: parsedTag.success ? parsedTag.data : undefined,
            commentID: parsedCommentID.success ? parsedCommentID.data : undefined,
        });
    }
}
Metadata.metadataFreezingTag = 'freezing-tag';
Metadata.metadataCommentID = 'comment-id';
//# sourceMappingURL=metadata.js.map