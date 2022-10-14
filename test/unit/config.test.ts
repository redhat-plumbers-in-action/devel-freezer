import { describe, it, expect, beforeEach, test } from 'vitest';

import { Config } from '../../src/config';

import {
  configContextFixture,
  IConfigTestContext,
} from './fixtures/config.fixture';

describe('Config Object', () => {
  beforeEach<IConfigTestContext>(context => {
    context.configs = configContextFixture.configs;
    context.invalid = configContextFixture.invalid;
  });

  it<IConfigTestContext>('can be instantiated', context => {
    context.configs.map(item => expect(item).toBeDefined());
  });

  test<IConfigTestContext>('get policy()', context => {
    context.configs.map(configItem => {
      expect(configItem.policy).toMatchSnapshot();

      configItem.policy.map(policyItem => {
        expect(policyItem.tags).toMatchSnapshot();
        expect(policyItem.feedback).toMatchSnapshot();
        expect(policyItem.feedback.frozenState).toMatchSnapshot();
        expect(policyItem.feedback.unFreezeState).toMatchSnapshot();
      });
    });
  });

  it<IConfigTestContext>('is valid', async context => {
    context.configs.map(async item =>
      expect(Config.validate(item)).resolves.toMatchObject([])
    );
  });

  it<IConfigTestContext>('is invalid', async context => {
    context.invalid.map(async item =>
      expect(Config.validate(item)).resolves.toMatchSnapshot()
    );
  });

  test<IConfigTestContext>('is config empty', context => {
    context.configs.map(async item =>
      expect(Config.isConfigEmpty(item)).toEqual(false)
    );

    context.invalid.map(async item =>
      expect(Config.isConfigEmpty(item)).toEqual(false)
    );

    expect(Config.isConfigEmpty(null)).toEqual(true);
  });
});
