import { Context } from 'probot';
import { events } from './events';
export declare function publishComment(content: string, tag: string, context: {
    [K in keyof typeof events]: Context<typeof events[K][number]>;
}[keyof typeof events]): Promise<void>;
