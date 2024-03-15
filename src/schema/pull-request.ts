import { z } from 'zod';

export const labelDataSchema = z.object({
  name: z.string(),
});

export type LabelData = z.infer<typeof labelDataSchema>;

export const milestoneDataSchema = z.object({
  html_url: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string(),
  state: z.string(),
});

export type MilestoneData = z.infer<typeof milestoneDataSchema>;

export const pullRequestDataSchema = z.object({
  labels: z.array(labelDataSchema),
  milestone: milestoneDataSchema.nullable(),
});

export type PullRequestData = z.infer<typeof pullRequestDataSchema>;
