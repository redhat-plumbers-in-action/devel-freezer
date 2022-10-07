export class Tag {
    constructor(tag) {
        this._latest = tag;
    }
    get latest() {
        return this._latest;
    }
    isFreezed(tagPolicy) {
        if (this.latest === undefined)
            false;
        return tagPolicy.some(regex => new RegExp(regex).test(this.latest));
    }
    static async getLatestTag(context) {
        var _a;
        const tags = (await context.octokit.rest.repos.listTags(context.repo()))
            .data;
        if (!tags || tags.length <= 0)
            return undefined;
        return (_a = tags.shift()) === null || _a === void 0 ? void 0 : _a.name;
    }
}
//# sourceMappingURL=tag.js.map