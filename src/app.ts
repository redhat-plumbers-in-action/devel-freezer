import { debug, error, warning } from '@actions/core';
import { Context, Probot } from 'probot';
import { validateOrReject } from 'class-validator';

import { events } from './events';
import { freezePullRequest } from './freezer';
import { getLatestTag, isTagFreezed } from './release';
import { Config } from './config';

const app = (probot: Probot) => {
  probot.on(
    events.pull_request,
    async (context: Context<typeof events.pull_request[number]>) => {
      const config = await Config.getConfig(context);

      await validateOrReject(config);

      if (!config) {
        error(
          `Missing configuration. Please setup 'devel-freezer' action using 'development-freeze.yml' file.`
        );
        return;
      }

      const latestTag = await getLatestTag(context);

      if (!latestTag) {
        warning(`Repository doesn't have any tags or releases published.`);
        return;
      }

      debug(`Latest tag is: '${latestTag}'`);

      for (const item of config.policy) {
        if (!isTagFreezed(latestTag, item.tags)) {
          continue;
        }

        await freezePullRequest(item.feedback.freezedState, latestTag, context);
        return;
      }

      // TODO: If PR is changed and contains metadata from devel-freezer, update comment
      // ? It requires knowledge about old freezing tag ...

      // get metadata if any
      // if metadata check tag and get unfreezing comment (for loop policy)
      // update metadata and comment

      debug(
        `The latest tag doesn't match the requirements for a development freeze.`
      );
    }
  );
};

export default app;
