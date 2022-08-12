import { Context } from 'probot';
import { events } from './events';
export declare function getLatestTag(context: {
    [K in keyof typeof events]: Context<typeof events[K][number]>;
}[keyof typeof events]): Promise<string | undefined>;
export declare function isTagFreezed(tag: string, policy: string[]): boolean;
