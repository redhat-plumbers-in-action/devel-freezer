import { debug, warning } from '@actions/core';
import { setTimeout } from 'timers/promises';
export async function delay(seconds) {
    warning(`Delaying the action for ${seconds} seconds.`);
    await setTimeout(seconds * 1000);
    debug('Delay is over.');
}
//# sourceMappingURL=delay.js.map