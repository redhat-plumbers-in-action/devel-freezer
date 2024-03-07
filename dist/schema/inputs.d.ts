import { z } from 'zod';
export declare const inputDelaySchema: z.ZodNumber;
export type InputDelay = z.infer<typeof inputDelaySchema>;
