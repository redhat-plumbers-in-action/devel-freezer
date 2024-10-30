import { Metadata } from './metadata';
import { CustomOctokit } from './octokit';
import { Milestone } from './milestone';
export declare class PullRequest {
    readonly id: number;
    readonly octokit: CustomOctokit;
    labels: string[];
    milestone: Milestone | null;
    private _metadata;
    constructor(id: number, octokit: CustomOctokit);
    set metadata(metadata: Metadata);
    get metadata(): Metadata;
    initialize(): Promise<void>;
    setPullRequestData(): Promise<void>;
    setMetadata(): Promise<void>;
    isFreezed(): boolean;
    isTagPolicyCompliant(tagPolicy: string[], tag?: string): boolean;
    freeze(content: string, freezingTag: string): Promise<void>;
    unfreeze(content: string): Promise<void>;
    publishComment(content: string): Promise<number | undefined>;
    createComment(body: string): Promise<{
        id: number;
        node_id: string;
        url: string;
        body?: string;
        body_text?: string;
        body_html?: string;
        html_url: string;
        user: import("@octokit/openapi-types").components["schemas"]["nullable-simple-user"];
        created_at: string;
        updated_at: string;
        issue_url: string;
        author_association: import("@octokit/openapi-types").components["schemas"]["author-association"];
        performed_via_github_app?: import("@octokit/openapi-types").components["schemas"]["nullable-integration"];
        reactions?: import("@octokit/openapi-types").components["schemas"]["reaction-rollup"];
    } | undefined>;
    private updateComment;
}
