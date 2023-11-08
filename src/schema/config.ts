import { z } from 'zod';

export const policySchema = z.object({
  tags: z.array(z.string().min(1)),
  feedback: z.object({
    'frozen-state': z.string().min(1),
    'unfreeze-state': z.string().min(1),
  }),
});
export type PolicySchema = z.infer<typeof policySchema>;

export const configSchema = z.object({
  policy: z.array(policySchema).min(1),
});
