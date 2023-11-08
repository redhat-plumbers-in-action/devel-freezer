import { debug, warning } from '@actions/core';
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
        debug(`Checking tag policy for PR: #${this.id}`);
        const freezingTag = tag !== null && tag !== void 0 ? tag : this.metadata.tag;
        if (freezingTag === undefined)
            false;
        return tagPolicy.some(regex => new RegExp(regex).test(freezingTag));
    }
    async freeze(content, freezingTag) {
        debug(`Freezing PR: #${this.id}`);
        const id = await this.publishComment(content);
        this.metadata.commentID = id === undefined ? id : id.toString();
        this.metadata.tag = freezingTag;
        await this.metadata.setMetadata();
    }
    async unfreeze(content) {
        debug(`Unfreezing PR: #${this.id}`);
        const id = await this.publishComment(content);
        this.metadata.commentID = id === undefined ? id : id.toString();
        await this.metadata.setMetadata();
    }
    async publishComment(content) {
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
    async createComment(body) {
        if (!body || body === '')
            return;
        debug(`Creating comment for PR: #${this.id}`);
        const { data } = await this.octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', Object.assign(Object.assign({}, context.repo), { issue_number: this.id, body }));
        return data;
    }
    async updateComment(body) {
        if (!this.metadata.commentID)
            return;
        debug(`Updating comment with ID: ${this.metadata.commentID}`);
        const { data } = await this.octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}', Object.assign(Object.assign({}, context.repo), { comment_id: +this.metadata.commentID, body }));
        return data;
    }
    static async getPullRequest(id, octokit) {
        return new PullRequest(id, octokit, await Metadata.getMetadata(id));
    }
}
//# sourceMappingURL=pull-request.js.map