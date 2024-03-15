import { z } from 'zod';
export const labelDataSchema = z.object({
    name: z.string(),
});
export const milestoneDataSchema = z.object({
    html_url: z.string(),
    number: z.number(),
    title: z.string(),
    description: z.string(),
    state: z.string(),
});
export const pullRequestDataSchema = z.object({
    labels: z.array(labelDataSchema),
    milestone: milestoneDataSchema.nullable(),
});
//# sourceMappingURL=pull-request.js.map