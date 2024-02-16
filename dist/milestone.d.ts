import { MilestoneData } from './schema/pull-request';
export declare class Milestone {
    readonly htmlURL: string;
    readonly number: number;
    readonly title: string;
    readonly description: string;
    readonly state: string;
    readonly regex: RegExp;
    constructor(data: MilestoneData);
    isCompliant(tag: string): boolean;
}
