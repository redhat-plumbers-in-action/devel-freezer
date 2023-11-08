import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  MinLength,
  validate,
  ValidateNested,
} from 'class-validator';

import { CustomOctokit } from './octokit';
import { ValidationFeedback } from './validation-feedback';

import { TConfigObject, TFeedback, TPolicyItem } from './types.d';

export class Config {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  private _policy: PolicyItem[];

  constructor(config: TConfigObject) {
    this._policy = Array.isArray(config?.policy)
      ? config.policy.map(item => new PolicyItem(item))
      : [];
  }

  get policy() {
    return this._policy;
  }

  static async getConfig(octokit: CustomOctokit) {
    const path = getInput('config-path', { required: true });

    const retrievedConfig = (
      await octokit.config.get({
        ...context.repo,
        path,
      })
    ).config;

    debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);

    if (Config.isConfigEmpty(retrievedConfig)) {
      throw new Error(
        `Missing configuration. Please setup 'devel-freezer' Action using 'development-freeze.yml' file.`
      );
    }

    const config = new this(retrievedConfig as TConfigObject);

    return config;
  }

  static isConfigEmpty(config: TConfigObject | null | unknown) {
    return config === null;
  }

  static async validate(instance: Config) {
    const validationResult = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const results = validationResult.map(error => {
      return ValidationFeedback.composeFeedbackObject(error);
    });

    return results;
  }
}

class PolicyItem {
  @IsString({ each: true })
  @MinLength(1, { each: true })
  private _tags: string[];

  @ValidateNested()
  private _feedback: Feedback;

  constructor(item: TPolicyItem) {
    this._tags = item.tags;
    this._feedback = new Feedback(item.feedback);
  }

  get tags() {
    return this._tags;
  }

  get feedback() {
    return this._feedback;
  }
}

class Feedback {
  @IsString()
  @MinLength(1)
  private _frozenState: string;

  @IsString()
  @MinLength(1)
  private _unFreezeState: string;

  constructor(feedback: TFeedback) {
    this._frozenState = feedback['frozen-state'];
    this._unFreezeState = feedback['unfreeze-state'];
  }

  get frozenState() {
    return this._frozenState;
  }

  get unFreezeState() {
    return this._unFreezeState;
  }
}
