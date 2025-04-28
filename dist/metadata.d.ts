import MetadataController from 'issue-metadata';
type MetadataObject = {
    tag: string | undefined;
    commentID: string | undefined;
};
export declare class Metadata {
    readonly issueNumber: number;
    readonly controller: MetadataController;
    private _tag;
    private _commentID;
    constructor(issueNumber: number, controller: MetadataController, metadata: MetadataObject);
    get tag(): MetadataObject["tag"];
    set tag(value: MetadataObject['tag']);
    get commentID(): MetadataObject["commentID"];
    set commentID(value: MetadataObject['commentID']);
    static readonly metadataFreezingTag = "freezing-tag";
    static readonly metadataCommentID = "comment-id";
    setMetadata(): Promise<void>;
    static getMetadata(issueNumber: number): Promise<Metadata>;
}
export {};
