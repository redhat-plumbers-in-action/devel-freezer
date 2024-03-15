import { debug, warning, getInput } from '@actions/core';
import { Config } from './config';
import { Tag } from './tag';
import { delay } from './delay';
import { inputDelaySchema } from './schema/inputs';
async function action(pr, octokit) {
    const delayParsed = inputDelaySchema.safeParse(getInput('delay'));
    const delaySeconds = delayParsed.success ? delayParsed.data : 0;
    if (delaySeconds > 0) {
        await delay(delaySeconds);
    }
    const config = await Config.getConfig(octokit);
    const tag = new Tag(await Tag.getLatestTag());
    if (!tag.latest) {
        warning(`Repository doesn't have any tags or releases published.`);
        return;
    }
    debug(`Latest tag is: '${tag.latest}'`);
    // TODO:
    // * check milestone of the PR
    // * check if milestone is matching the tag??? or if it has expected format???
    // * add option to add delay to the freeze/unfreeze action to account for the time to add milestone/labels to the PR
    for (const policyItem of config.policy) {
        if (!tag.isFreezed(policyItem.tags)) {
            continue;
        }
        await pr.freeze(policyItem.feedback['frozen-state'], tag.latest);
        return;
    }
    if (!pr.isFreezed()) {
        return;
    }
    for (const policyItem of config.policy) {
        if (!pr.isTagPolicyCompliant(policyItem.tags)) {
            continue;
        }
        await pr.unfreeze(policyItem.feedback['unfreeze-state']);
        return;
    }
    debug(`The latest tag doesn't match the requirements for a development freeze.`);
}
export default action;
//# sourceMappingURL=action.js.map