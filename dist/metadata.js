/**
 * Based on probot-metadata - https://github.com/probot/metadata
 */
const regex = /\n\n<!-- devel-freezer = (.*) -->/;
export async function getMetadata(key, context) {
    const body = (await context.octokit.issues.get(context.issue())).data.body || '';
    const match = body.match(regex);
    if (match) {
        const data = JSON.parse(match[1]);
        return key ? data && data[key] : data;
    }
}
export async function setMetadata(key, value, context, issueNumber) {
    let body = (await context.octokit.issues.get(context.issue(issueNumber ? { issue_number: issueNumber } : {}))).data.body || '';
    let data = {};
    body = body.replace(regex, (_, json) => {
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
//# sourceMappingURL=metadata.js.map