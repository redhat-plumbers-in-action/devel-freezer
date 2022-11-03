export declare class Tag {
    private _latest;
    constructor(tag: string | undefined);
    get latest(): string | undefined;
    isFreezed(tagPolicy: string[]): boolean;
    static getLatestTag(): Promise<string | undefined>;
}
