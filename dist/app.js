import { debug, error, warning } from '@actions/core';
import { validateOrReject } from 'class-validator';
import { Config } from './config';
import { events } from './events';
import { PullRequest } from './pull-request';
import { Tag } from './tag';
const app = (probot) => {
    probot.on(events.pull_request, async (context) => {
        const config = await Config.getConfig(context);
        // TODO: Proper error handling
        await validateOrReject(config);
        if (!config) {
            error(`Missing configuration. Please setup 'devel-freezer' action using 'development-freeze.yml' file.`);
            return;
        }
        const tag = new Tag(await Tag.getLatestTag(context));
        if (!tag.latest) {
            warning(`Repository doesn't have any tags or releases published.`);
            return;
        }
        debug(`Latest tag is: '${tag.latest}'`);
        const pullRequest = await PullRequest.getPullRequest(context);
        for (const policyItem of config.policy) {
            if (!tag.isFreezed(policyItem.tags)) {
                continue;
            }
            await pullRequest.freeze(policyItem.feedback.freezedState, tag.latest, context);
            return;
        }
        if (!pullRequest.isFreezed()) {
            return;
        }
        for (const policyItem of config.policy) {
            if (!pullRequest.isTagPolicyComplient(policyItem.tags)) {
                continue;
            }
            await pullRequest.unfreeze(policyItem.feedback.unFreezedState, context);
            return;
        }
        debug(`The latest tag doesn't match the requirements for a development freeze.`);
    });
};
export default app;
//# sourceMappingURL=app.js.map