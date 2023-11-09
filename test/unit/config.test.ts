import { describe, it, expect, beforeEach, test } from 'vitest';

import { Config } from '../../src/config';

import {
  configContextFixture,
  IConfigTestContext,
} from './fixtures/config.fixture';
import { CustomOctokit } from '../../src/octokit';

describe('Config Object', () => {
  beforeEach<IConfigTestContext>(context => {
    context.configs = configContextFixture.configs;
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
        expect(policyItem.feedback['frozen-state']).toMatchSnapshot();
        expect(policyItem.feedback['unfreeze-state']).toMatchSnapshot();
      });
    });
  });

  test('getConfig()', async () => {
    process.env['INPUT_CONFIG-PATH'] = '.github/development-freeze.yml';
    process.env['GITHUB_REPOSITORY'] = 'test/test';

    const configObject = {
      policy: [
        {
          tags: ['alpha', 'beta'],
          feedback: {
            'frozen-state': 'This is No-No',
            'unfreeze-state': 'This is Yes-Yes',
          },
          random: 'random',
        },
      ],
    };

    const noConfigObject = undefined;

    const octokit = (data: unknown) => {
      return {
        config: {
          get: async (options: {
            owner: string;
            repo: string;
            path: string;
          }) => {
            return {
              config: data,
              files: [options.path],
            };
          },
        },
      } as unknown as CustomOctokit;
    };

    let config = await Config.getConfig(octokit(configObject));
    expect(config.policy).toMatchInlineSnapshot(`
      [
        {
          "feedback": {
            "frozen-state": "This is No-No",
            "unfreeze-state": "This is Yes-Yes",
          },
          "tags": [
            "alpha",
            "beta",
          ],
        },
      ]
    `);

    await expect(
      Config.getConfig(octokit(noConfigObject))
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      "\"Missing configuration. Please setup 'devel-freezer' Action using '.github/development-freeze.yml' file.\""
    );
  });

  test<IConfigTestContext>('is config empty', context => {
    context.configs.map(async item =>
      expect(Config.isConfigEmpty(item)).toEqual(false)
    );

    expect(Config.isConfigEmpty(null)).toEqual(true);
  });
});
