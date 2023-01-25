import { warning } from '@actions/core';
import { Metadata } from './metadata';
export class PullRequest {
    constructor(id, metadata) {
        this.id = id;
        this._metadata = metadata;
    }
    get metadata() {
        return this._metadata;
    }
    isFreezed() {
        return !!this.metadata.commentID && !!this.metadata.tag;
    }
    isTagPolicyCompliant(tagPolicy, tag) {
        const freezingTag = tag !== null && tag !== void 0 ? tag : this.metadata.tag;
        if (freezingTag === undefined)
            false;
        return tagPolicy.some(regex => new RegExp(regex).test(freezingTag));
    }
    async freeze(content, freezingTag, context) {
        const id = await this.publishComment(content, context);
        this.metadata.commentID = id === undefined ? id : id.toString();
        this.metadata.tag = freezingTag;
        await this.metadata.setMetadata(context);
    }
    async unfreeze(content, context) {
        const id = await this.publishComment(content, context);
        this.metadata.commentID = id === undefined ? id : id.toString();
        await this.metadata.setMetadata(context);
    }
    async publishComment(content, context) {
        var _a;
        if (this.metadata.commentID) {
            this.updateComment(content, context);
            return;
        }
        const commentPayload = (_a = (await this.createComment(content, context))) === null || _a === void 0 ? void 0 : _a.data;
        if (!commentPayload) {
            warning(`Failed to create comment.`);
            return;
        }
        return commentPayload.id;
    }
    createComment(body, context) {
        if (!body || body === '')
            return;
        return context.octokit.issues.createComment(
        // !FIXME: This is wrong, don't use `as`
        context.issue({
            issue_number: this.id,
            body,
        }));
    }
    async updateComment(body, context) {
        if (!this.metadata.commentID)
            return;
        return context.octokit.issues.updateComment(
        // !FIXME: This is wrong, don't use `as`
        context.issue({
            comment_id: +this.metadata.commentID,
            body,
        }));
    }
    static async getPullRequest(id, context) {
        return new PullRequest(id, await Metadata.getMetadata(id, context));
    }
}
//# sourceMappingURL=pull-request.js.map