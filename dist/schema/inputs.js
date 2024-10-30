import { z } from 'zod';
export const inputPrNumberSchema = z.coerce.number().int().positive();
export const inputDelaySchema = z.coerce.number().min(0);
//# sourceMappingURL=inputs.js.map