import { Config } from '../../../src/config';

export interface IConfigTestContext {
  configs: Config[];
}

export const configContextFixture: IConfigTestContext = {
  configs: [
    new Config({
      policy: [
        {
          tags: ['alpha', 'beta'],
          feedback: {
            'frozen-state': 'This is No-No',
            'unfreeze-state': 'This is Yes-Yes',
          },
        },
      ],
    }),
  ],
};
