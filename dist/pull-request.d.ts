import { Metadata } from './metadata';
import { CustomOctokit } from './octokit';
export declare class PullRequest {
    readonly id: number;
    readonly octokit: CustomOctokit;
    private _metadata;
    constructor(id: number, octokit: CustomOctokit, metadata: Metadata);
    get metadata(): Metadata;
    isFreezed(): boolean;
    isTagPolicyCompliant(tagPolicy: string[], tag?: string): boolean;
    freeze(content: string, freezingTag: string): Promise<void>;
    unfreeze(content: string): Promise<void>;
    publishComment(content: string): Promise<any>;
    createComment(body: string): Promise<any>;
    private updateComment;
    static getPullRequest(id: number, octokit: CustomOctokit): Promise<PullRequest>;
}
