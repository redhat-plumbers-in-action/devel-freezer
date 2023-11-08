import { CustomOctokit } from './octokit';
import { PolicySchema } from './schema/config';
export declare class Config {
    policy: PolicySchema[];
    constructor(config: unknown);
    static getConfig(octokit: CustomOctokit): Promise<Config>;
    static isConfigEmpty(config: unknown): boolean;
}
