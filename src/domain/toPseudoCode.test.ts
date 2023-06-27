import { describe, test, expect } from '@jest/globals';

import { toPseudoCode } from './toPseudoCode';

import { TokenADD, TokenDIV, TokenMUL, TokenSUB } from './tests.shared';

describe('toPseudoCode function', () => {
  test('Empty postfix is valid', () => {
    const res = toPseudoCode([]);

    expect(res.isValid).toBe(true);
  });

  test('CONST is valid', () => {
    const res = toPseudoCode(['123']);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: 'PUSH', operand1: '123', operand2: '' },
    ]);
  });

  test('CONST CONST ADD is valid', () => {
    const res = toPseudoCode(['1', '2', TokenADD.type]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenADD.type, operand1: '1', operand2: '2' },
    ]);
  });

  test('CONST CONST SUB is valid', () => {
    const res = toPseudoCode(['1', '2', TokenSUB.type]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenSUB.type, operand1: '1', operand2: '2' },
    ]);
  });

  test('CONST CONST MUL is valid', () => {
    const res = toPseudoCode(['1', '2', TokenMUL.type]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenMUL.type, operand1: '1', operand2: '2' },
    ]);
  });

  test('CONST CONST DIV is valid', () => {
    const res = toPseudoCode(['1', '2', TokenDIV.type]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenDIV.type, operand1: '1', operand2: '2' },
    ]);
  });

  test('CONST CONST ADD CONST ADD is valid', () => {
    const res = toPseudoCode(['1', '2', TokenADD.type, '3', TokenADD.type]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenADD.type, operand1: '1', operand2: '2' },
      { operation: TokenADD.type, operand1: 'POP', operand2: '3' },
    ]);
  });

  test('CONST CONST MUL CONST CONST MUL ADD is valid', () => {
    const res = toPseudoCode([
      '1',
      '2',
      TokenMUL.type,
      '3',
      '4',
      TokenMUL.type,
      TokenADD.type,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenMUL.type, operand1: '1', operand2: '2' },
      { operation: TokenMUL.type, operand1: '3', operand2: '4' },
      { operation: TokenADD.type, operand1: 'POP', operand2: 'POP' },
    ]);
  });

  test('CONST CONST CONST MUL ADD is valid', () => {
    const res = toPseudoCode(['1', '2', '3', TokenMUL.type, TokenADD.type]);

    expect(res.isValid).toBe(true);
    expect(res.pseudoCode).toStrictEqual([
      { operation: TokenMUL.type, operand1: '2', operand2: '3' },
      { operation: TokenADD.type, operand1: '1', operand2: 'POP' },
    ]);
  });

  test('CONST CONST CONST ~ ADD is invalid', () => {
    const res = toPseudoCode(['1', '2', '3', '~', TokenADD.type]);

    expect(res.isValid).toBe(false);
  });

  test('CONST SUB is invalid', () => {
    const res = toPseudoCode(['1', TokenSUB.type]);

    expect(res.isValid).toBe(false);
  });
});
