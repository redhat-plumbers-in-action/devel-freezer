import { warning } from '@actions/core';
import { context } from '@actions/github';
import { Metadata } from './metadata';
export class PullRequest {
    constructor(id, octokit, metadata) {
        this.id = id;
        this.octokit = octokit;
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
    async freeze(content, freezingTag) {
        const id = await this.publishComment(content);
        this.metadata.commentID = id === undefined ? id : id.toString();
        this.metadata.tag = freezingTag;
        await this.metadata.setMetadata();
    }
    async unfreeze(content) {
        const id = await this.publishComment(content);
        this.metadata.commentID = id === undefined ? id : id.toString();
        await this.metadata.setMetadata();
    }
    async publishComment(content) {
        var _a;
        if (this.metadata.commentID) {
            this.updateComment(content);
            return;
        }
        const commentPayload = (_a = (await this.createComment(content))) === null || _a === void 0 ? void 0 : _a.data;
        if (!commentPayload) {
            warning(`Failed to create comment.`);
            return;
        }
        return commentPayload.id;
    }
    async createComment(body) {
        if (!body || body === '')
            return;
        const { data } = await this.octokit.request('POST /repos/{owner}/{repo}/issues/comments', Object.assign(Object.assign({}, context.repo), { issue_number: this.id, body }));
        return data;
    }
    async updateComment(body) {
        if (!this.metadata.commentID)
            return;
        const { data } = await this.octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}', Object.assign(Object.assign({}, context.repo), { comment_id: +this.metadata.commentID, body }));
        return data;
    }
    static async getPullRequest(id, octokit) {
        return new PullRequest(id, octokit, await Metadata.getMetadata(id));
    }
}
//# sourceMappingURL=pull-request.js.map