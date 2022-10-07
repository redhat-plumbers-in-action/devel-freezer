import { Context } from 'probot';
import { events } from './events';
interface IMetadataObject {
    tag: string | undefined;
    commentID: string | undefined;
}
export declare class Metadata {
    private _tag;
    private _commentID;
    constructor(metadata: IMetadataObject);
    get tag(): IMetadataObject['tag'];
    set tag(value: IMetadataObject['tag']);
    get commentID(): IMetadataObject['commentID'];
    set commentID(value: IMetadataObject['commentID']);
    setMetadata(context: {
        [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]): Promise<void>;
    static readonly metadataFreezingTag = "freezing-tag";
    static readonly metadataCommentID = "comment-id";
    static getMetadata(context: {
        [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]): Promise<Metadata>;
}
export {};
