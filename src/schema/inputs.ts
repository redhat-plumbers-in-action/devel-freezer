import { z } from 'zod';

export const inputPrNumberSchema = z.coerce.number().int().positive();
export type InputPrNumber = z.infer<typeof inputPrNumberSchema>;

export const inputDelaySchema = z.coerce.number().min(0);
export type InputDelay = z.infer<typeof inputDelaySchema>;
