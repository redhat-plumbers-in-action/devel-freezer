import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';

import { CustomOctokit } from './octokit';
import { PolicySchema, configSchema } from './schema/config';

export class Config {
  policy: PolicySchema[] = [];

  constructor(config: unknown) {
    const parsedConfig = configSchema.parse(config);
    this.policy = parsedConfig.policy;
  }

  static async getConfig(octokit: CustomOctokit): Promise<Config> {
    const path = getInput('config-path', { required: true });

    const retrievedConfig = (
      await octokit.config.get({
        ...context.repo,
        path,
      })
    ).config;

    debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);

    if (Config.isConfigEmpty(retrievedConfig)) {
      throw new Error(
        `Missing configuration. Please setup 'devel-freezer' Action using '${getInput(
          'config-path'
        )}' file.`
      );
    }

    return new this(retrievedConfig);
  }

  static isConfigEmpty(config: unknown): boolean {
    return config === null || config === undefined;
  }
}
