import { CustomOctokit } from './octokit';
import { TConfigObject, TFeedback, TPolicyItem } from './types.d';
export declare class Config {
    private _policy;
    constructor(config: TConfigObject);
    get policy(): PolicyItem[];
    static getConfig(octokit: CustomOctokit): Promise<Config>;
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
