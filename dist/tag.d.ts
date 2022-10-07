import { Context } from 'probot';
import { events } from './events';
export declare class Tag {
    private _latest;
    constructor(tag: string | undefined);
    get latest(): string | undefined;
    isFreezed(tagPolicy: string[]): boolean;
    static getLatestTag(context: {
        [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]): Promise<string | undefined>;
}
