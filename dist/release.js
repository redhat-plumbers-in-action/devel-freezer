export async function getLatestTag(context) {
    var _a;
    const tags = (await context.octokit.rest.repos.listTags(context.repo())).data;
    if (!tags || tags.length <= 0)
        return undefined;
    return (_a = tags.shift()) === null || _a === void 0 ? void 0 : _a.name;
}
export function isTagFreezed(tag, policy) {
    return policy.some(regex => new RegExp(regex).test(tag));
}
//# sourceMappingURL=release.js.map