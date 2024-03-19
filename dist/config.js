import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import { configSchema } from './schema/config';
export class Config {
    constructor(config) {
        this.policy = [];
        const parsedConfig = configSchema.parse(config);
        this.policy = parsedConfig.policy;
    }
    static async getConfig(octokit) {
        const path = getInput('config-path', { required: true });
        const retrievedConfig = (await octokit.config.get(Object.assign(Object.assign({}, context.repo), { path }))).config;
        debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);
        if (Config.isConfigEmpty(retrievedConfig)) {
            throw new Error(`Missing configuration. Please setup 'devel-freezer' Action using '${getInput('config-path')}' file.`);
        }
        return new this(retrievedConfig);
    }
    static isConfigEmpty(config) {
        return config === null || config === undefined;
    }
}
//# sourceMappingURL=config.js.map