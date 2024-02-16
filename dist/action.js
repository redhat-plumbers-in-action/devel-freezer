import { debug, warning, getInput, info } from '@actions/core';
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
    // Loop through the policy items and check if the latest tag is freezing (matches the policy)
    for (const policyItem of config.policy) {
        if (!tag.isFreezed(policyItem.tags)) {
            continue;
        }
        // check if milestone is set and matches the pre-release tag ~ PR is planned to get merged before the next release
        if (pr.milestone !== null && pr.milestone.isCompliant(tag.latest)) {
            info(`PR is marked with a milestone that matches the latest pre-release tag.`);
            continue;
        }
        // Mark PR as frozen when all conditions are met
        await pr.freeze(policyItem.feedback['frozen-state'], tag.latest);
        return;
    }
    // When PR is not frozen, return early
    if (!pr.isFreezed()) {
        return;
    }
    // Loop through the policy items and unfreeze PR when conditions are no longer met
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