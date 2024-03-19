import { Octokit } from '@octokit/core';
export declare const CustomOctokit: typeof Octokit & import("@octokit/core/dist-types/types").Constructor<import("@probot/octokit-plugin-config").API>;
export type CustomOctokit = InstanceType<typeof CustomOctokit>;
export declare function getOctokit(token: string): CustomOctokit;
