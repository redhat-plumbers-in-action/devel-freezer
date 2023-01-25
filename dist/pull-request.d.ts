import { Context } from 'probot';
import { events } from './events';
import { Metadata } from './metadata';
export declare class PullRequest {
    readonly id: number;
    private _metadata;
    constructor(id: number, metadata: Metadata);
    get metadata(): Metadata;
    isFreezed(): boolean;
    isTagPolicyCompliant(tagPolicy: string[], tag?: string): boolean;
    freeze(content: string, freezingTag: string, context: {
        [K in keyof typeof events]: Context<(typeof events)[K][number]>;
    }[keyof typeof events]): Promise<void>;
    unfreeze(content: string, context: {
        [K in keyof typeof events]: Context<(typeof events)[K][number]>;
    }[keyof typeof events]): Promise<void>;
    private publishComment;
    private createComment;
    private updateComment;
    static getPullRequest(id: number, context: {
        [K in keyof typeof events]: Context<(typeof events)[K][number]>;
    }[keyof typeof events]): Promise<PullRequest>;
}
