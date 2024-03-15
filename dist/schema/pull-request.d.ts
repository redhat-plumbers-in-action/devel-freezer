import { z } from 'zod';
export declare const labelDataSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type LabelData = z.infer<typeof labelDataSchema>;
export declare const milestoneDataSchema: z.ZodObject<{
    html_url: z.ZodString;
    number: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodString;
    state: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: number;
    html_url: string;
    title: string;
    description: string;
    state: string;
}, {
    number: number;
    html_url: string;
    title: string;
    description: string;
    state: string;
}>;
export type MilestoneData = z.infer<typeof milestoneDataSchema>;
export declare const pullRequestDataSchema: z.ZodObject<{
    labels: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>, "many">;
    milestone: z.ZodNullable<z.ZodObject<{
        html_url: z.ZodString;
        number: z.ZodNumber;
        title: z.ZodString;
        description: z.ZodString;
        state: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: number;
        html_url: string;
        title: string;
        description: string;
        state: string;
    }, {
        number: number;
        html_url: string;
        title: string;
        description: string;
        state: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    labels: {
        name: string;
    }[];
    milestone: {
        number: number;
        html_url: string;
        title: string;
        description: string;
        state: string;
    } | null;
}, {
    labels: {
        name: string;
    }[];
    milestone: {
        number: number;
        html_url: string;
        title: string;
        description: string;
        state: string;
    } | null;
}>;
export type PullRequestData = z.infer<typeof pullRequestDataSchema>;
