import { z } from 'zod';
export declare const policySchema: z.ZodObject<{
    tags: z.ZodArray<z.ZodString, "many">;
    labels: z.ZodOptional<z.ZodObject<{
        allow: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        allow: string[];
    }, {
        allow: string[];
    }>>;
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
    labels?: {
        allow: string[];
    } | undefined;
}, {
    tags: string[];
    feedback: {
        'frozen-state': string;
        'unfreeze-state': string;
    };
    labels?: {
        allow: string[];
    } | undefined;
}>;
export type PolicySchema = z.infer<typeof policySchema>;
export declare const configSchema: z.ZodObject<{
    policy: z.ZodArray<z.ZodObject<{
        tags: z.ZodArray<z.ZodString, "many">;
        labels: z.ZodOptional<z.ZodObject<{
            allow: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            allow: string[];
        }, {
            allow: string[];
        }>>;
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
        labels?: {
            allow: string[];
        } | undefined;
    }, {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
        labels?: {
            allow: string[];
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    policy: {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
        labels?: {
            allow: string[];
        } | undefined;
    }[];
}, {
    policy: {
        tags: string[];
        feedback: {
            'frozen-state': string;
            'unfreeze-state': string;
        };
        labels?: {
            allow: string[];
        } | undefined;
    }[];
}>;
export type ConfigType = z.infer<typeof configSchema>;
