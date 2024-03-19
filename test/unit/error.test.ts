import { describe, expect, test } from 'vitest';

import { FreezerError, raise } from '../../src/error';

describe('Test FreezerError class', () => {
  test('without error code', () => {
    const error = new FreezerError('Some error');

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(FreezerError);

    expect(error.message).toMatchInlineSnapshot(`"Some error"`);
    expect(error.code).toBeUndefined();
  });

  test('with error code', () => {
    const error = new FreezerError('Some error', 42);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(FreezerError);

    expect(error.message).toMatchInlineSnapshot(`"Some error"`);
    expect(error.code).toMatchInlineSnapshot(`42`);
  });

  test('raise error', () => {
    expect(() => raise('Some error')).toThrowErrorMatchingInlineSnapshot(
      `[Error: Some error]`
    );
  });
});
