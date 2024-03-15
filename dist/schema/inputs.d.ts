import { z } from 'zod';
export declare const inputPrNumberSchema: z.ZodNumber;
export type InputPrNumber = z.infer<typeof inputPrNumberSchema>;
export declare const inputDelaySchema: z.ZodNumber;
export type InputDelay = z.infer<typeof inputDelaySchema>;
