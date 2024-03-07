import { z } from 'zod';

export const inputDelaySchema = z.coerce.number().min(0);
export type InputDelay = z.infer<typeof inputDelaySchema>;
