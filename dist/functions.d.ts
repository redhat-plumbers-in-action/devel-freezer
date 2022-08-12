import { Context } from 'probot';
import { ConfigObject } from './types.d';
export declare const events: {
    pull_request: ("pull_request.opened" | "pull_request.reopened")[];
    release: "release.created"[];
};
export declare function getConfig(context: Context<typeof events.pull_request[number]> | Context<typeof events.release[number]>): Promise<ConfigObject | null>;
export declare function getLatestTag(context: Context<typeof events.pull_request[number]> | Context<typeof events.release[number]>): Promise<{
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    zipball_url: string;
    tarball_url: string;
    node_id: string;
} | undefined>;
export declare function publishComment(content: string, context: {
    [K in keyof typeof events]: Context<typeof events[K][number]>;
}[keyof typeof events]): Promise<void>;
