import { describe, it, expect, beforeEach, test } from 'vitest';

import { Config } from '../../src/config';
import { CustomOctokit } from '../../src/octokit';

describe('Config Object', () => {
  let config: Config;
  let configRaw = {
    policy: [
      {
        tags: ['alpha', 'beta'],
        feedback: {
          'frozen-state': 'This is No-No',
          'unfreeze-state': 'This is Yes-Yes',
        },
      },
      {
        tags: [`^(v\d*)-rc\d$`],
        labels: {
          allow: ['regression ⚠️'],
        },
        feedback: {
          'frozen-state': `We are currently in a development freeze phase.\nPlease ...`,
          'unfreeze-state': `We had successfully released a new major release.\nWe are no longer in a development freeze phase.`,
        },
      },
    ],
  };

  beforeEach(() => {
    config = new Config(configRaw);
  });

  it('can be instantiated', () => {
    expect(config).toBeDefined();
    expect(config).toBeInstanceOf(Config);
  });

  test('get policy()', () => {
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
        {
          "feedback": {
            "frozen-state": "We are currently in a development freeze phase.
      Please ...",
            "unfreeze-state": "We had successfully released a new major release.
      We are no longer in a development freeze phase.",
          },
          "labels": {
            "allow": [
              "regression ⚠️",
            ],
          },
          "tags": [
            "^(vd*)-rcd$",
          ],
        },
      ]
    `);
  });

  test('getConfig()', async () => {
    process.env['INPUT_CONFIG-PATH'] = '.github/development-freeze.yml';
    process.env['GITHUB_REPOSITORY'] = 'test/test';

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

    let config = await Config.getConfig(octokit(configRaw));
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
        {
          "feedback": {
            "frozen-state": "We are currently in a development freeze phase.
      Please ...",
            "unfreeze-state": "We had successfully released a new major release.
      We are no longer in a development freeze phase.",
          },
          "labels": {
            "allow": [
              "regression ⚠️",
            ],
          },
          "tags": [
            "^(vd*)-rcd$",
          ],
        },
      ]
    `);

    await expect(
      Config.getConfig(octokit(noConfigObject))
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `[Error: Missing configuration. Please setup 'devel-freezer' Action using '.github/development-freeze.yml' file.]`
    );
  });

  test('is config empty', () => {
    expect(Config.isConfigEmpty(configRaw)).toEqual(false);

    expect(Config.isConfigEmpty(null)).toEqual(true);
  });
});
