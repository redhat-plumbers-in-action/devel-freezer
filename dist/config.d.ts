import { Context } from 'probot';
import { events } from './events';
import { TConfigObject, TFeedback, TPolicyItem } from './types.d';
export declare class Config {
    private _policy;
    constructor(config: TConfigObject);
    get policy(): PolicyItem[];
    static getConfig(context: {
        [K in keyof typeof events]: Context<(typeof events)[K][number]>;
    }[keyof typeof events]): Promise<Config>;
    static isConfigEmpty(config: TConfigObject | null | unknown): boolean;
    static validate(instance: Config): Promise<{
        property: string;
        value: any;
        notes: {
            [type: string]: string;
        } | undefined;
    }[]>;
}
declare class PolicyItem {
    private _tags;
    private _feedback;
    constructor(item: TPolicyItem);
    get tags(): string[];
    get feedback(): Feedback;
}
declare class Feedback {
    private _frozenState;
    private _unFreezeState;
    constructor(feedback: TFeedback);
    get frozenState(): string;
    get unFreezeState(): string;
}
export {};
