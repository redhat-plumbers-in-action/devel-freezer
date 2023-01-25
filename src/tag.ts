import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { warning } from '@actions/core';

const promiseExec = promisify(exec);

export class Tag {
  private _latest: string | undefined;

  constructor(tag: string | undefined) {
    this._latest = tag;
  }

  get latest() {
    return this._latest;
  }

  isFreezed(tagPolicy: string[]) {
    if (this.latest === undefined) false;

    return tagPolicy.some(regex =>
      new RegExp(regex).test(this.latest as string)
    );
  }

  static async getLatestTag() {
    // Get latest tag sorted by date, currently impossible by using GitHub REST API
    const { stdout, stderr } = await promiseExec(
      // Get rid of new lines - it causes issues when regex is to explicit (including `$`)
      `git describe --tags --abbrev=0 | tr -d '\n'`
    );

    const tag = stdout;
    if (stderr) {
      warning(`Unable to get latest tag - stderr: ${stderr}`);
    }

    return !tag || tag.length <= 0 ? undefined : tag;
  }
}
