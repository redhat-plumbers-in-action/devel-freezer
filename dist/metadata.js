export class Metadata {
    constructor(metadata) {
        var _a, _b;
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
    async setMetadata(context) {
        var _a, _b;
        if (this.commentID !== undefined) {
            await MetadataController.setMetadata(Metadata.metadataCommentID, (_a = this.commentID) !== null && _a !== void 0 ? _a : '', context);
        }
        // TODO: clear tag when un-freezed
        await MetadataController.setMetadata(Metadata.metadataFreezingTag, (_b = this.tag) !== null && _b !== void 0 ? _b : '', context);
    }
    static async getMetadata(context) {
        return new Metadata({
            tag: await MetadataController.getMetadata(Metadata.metadataFreezingTag.toString(), context),
            commentID: await MetadataController.getMetadata(Metadata.metadataCommentID.toString(), context),
        });
    }
}
Metadata.metadataFreezingTag = 'freezing-tag';
Metadata.metadataCommentID = 'comment-id';
/**
 * Based on probot-metadata - https://github.com/probot/metadata
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MetadataController {
    static async getMetadata(key, context) {
        const body = (await context.octokit.issues.get(context.issue())).data.body || '';
        const match = body.match(MetadataController.regex);
        if (match) {
            const data = JSON.parse(match[1]);
            return key ? data && data[key] : data;
        }
    }
    static async setMetadata(key, value, context, issueNumber) {
        let body = (await context.octokit.issues.get(context.issue(issueNumber ? { issue_number: issueNumber } : {}))).data.body || '';
        let data = {};
        body = body.replace(MetadataController.regex, (_, json) => {
            data = JSON.parse(json);
            return '';
        });
        if (!data)
            data = {};
        if (typeof key === 'object') {
            Object.assign(data, key);
        }
        else {
            data[key] = value;
        }
        return context.octokit.issues.update(context.issue(Object.assign({ body: `${body}\n\n<!-- devel-freezer = ${JSON.stringify(data)} -->` }, (issueNumber ? { issue_number: issueNumber } : {}))));
    }
}
MetadataController.regex = /\n\n<!-- devel-freezer = (.*) -->/;
//# sourceMappingURL=metadata.js.map