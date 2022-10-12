import { Config } from '../../../src/config';

export interface IConfigTestContext {
  configs: Config[];
  invalid: Config[];
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

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Config(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new Config({}),
    new Config({ policy: [] }),
    new Config({
      policy: [
        {
          tags: [],
          // @ts-expect-error: Let's ignore a type error, it's required for testing
          feedback: {},
        },
      ],
    }),
  ],
};
