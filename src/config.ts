import { error } from '@actions/core';
import { Context } from 'probot';
import { IsString, MinLength, ValidateNested } from 'class-validator';

import { events } from './events';
import { TConfigObject, TFeedback, TPolicyItem } from './types.d';

export class Config {
  @ValidateNested()
  private _policy: PolicyItem[];

  constructor(config: TConfigObject) {
    this._policy = config.policy.map(item => new PolicyItem(item));
  }

  get policy() {
    return this._policy;
  }

  static async getConfig(
    context: {
      [K in keyof typeof events]: Context<typeof events[K][number]>;
    }[keyof typeof events]
  ) {
    const retrievedConfig = await context.config<TConfigObject>(
      'development-freeze.yml'
    );

    if (Config.isConfigEmpty(retrievedConfig)) {
      error(``);
      throw new Error();
    }

    const config = new this(retrievedConfig as TConfigObject);

    return config;
  }

  static isConfigEmpty(config: TConfigObject | null | unknown) {
    return config === null;
  }
}

class PolicyItem {
  @MinLength(1, {
    each: true,
  })
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
  private _freezedState: string;
  @IsString()
  private _unFreezedState: string;

  constructor(feedback: TFeedback) {
    this._freezedState = feedback['freezed-state'];
    this._unFreezedState = feedback['un-freezed-state'];
  }

  get freezedState() {
    return this._freezedState;
  }

  get unFreezedState() {
    return this._unFreezedState;
  }
}
