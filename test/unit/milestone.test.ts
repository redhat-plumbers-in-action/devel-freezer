import { describe, expect, beforeEach, test } from 'vitest';

import { Milestone } from '../../src/milestone';

describe('Metadata Class', () => {
  let milestone: Milestone;

  beforeEach(() => {
    milestone = new Milestone({
      html_url: '',
      number: 1,
      title: 'v255',
      description: 'description',
      state: 'open',
    });
  });

  test('can be instantiated', () => {
    expect(milestone).toBeDefined();
    expect(milestone).toBeInstanceOf(Milestone);
    expect(milestone.regex).toBeInstanceOf(RegExp);
    expect(milestone.regex.toString()).toBe('/^v255\\S*$/');
  });

  test('isCompliant()', () => {
    expect(milestone.isCompliant('v255-rc1')).toBe(true);
    expect(milestone.isCompliant('v255')).toBe(true);

    expect(milestone.isCompliant('v256-rc1')).toBe(false);
    expect(milestone.isCompliant('bla-bla')).toBe(false);
  });
});
