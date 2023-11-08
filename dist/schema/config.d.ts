import { z } from 'zod';
export declare const policySchema: z.ZodObject<{
    tags: z.ZodArray<z.ZodString, "many">;
    feedback: z.ZodObject<{
        'frozen-state': z.ZodString;
        'unfreeze-state': z.ZodString;
    }, "strip", z.ZodTypeAny, {
        'frozen-state': string;
        'unfreeze-state': string;
    }, {
        'frozen-state': string;
        'unfreeze-state': string;
    }>;
}, "strip", z.ZodTypeAny, {
    tags: string[];
    feedback: {
        'frozen-state': string;
        'unfreeze-state': string;
    };
}, {
    tags: string[];
    feedback: {
        'frozen-state': string;
        'unfreeze-state': string;
    };
}>;
export type PolicySchema = z.infer<typeof policySchema>;
export declare const configSchema: z.ZodObject<{
    policy: z.ZodArray<z.ZodObject<{
        tags: z.ZodArray<z.ZodString, "many">;
        feedback: z.ZodObject<{
            'frozen-state': z.ZodString;
            'unfreeze-state': z.ZodString;
        }, "strip", z.ZodTypeAny, {
            'frozen-state': string;
            'unfreeze-state': string;
        }, {
            'frozen-state': string;
            'unfreeze-state': string;
        }>;
    }, "strip", z.ZodTypeAny, {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
    }, {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    policy: {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
    }[];
}, {
    policy: {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
    }[];
}>;
