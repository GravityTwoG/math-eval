import { describe, test, expect } from '@jest/globals';

import { evaluate } from './evaluator';

import { TokenADD, TokenDIV, TokenMUL, TokenSUB } from './tests.shared';

describe('Evaluator', () => {
  test('Empty code is invalid', () => {
    const res = evaluate([]);

    expect(res.isValid).toBe(false);
  });

  test('PUSH', () => {
    const res = evaluate([{ operation: 'PUSH', operand1: '1', operand2: '' }]);

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(1);
  });

  test('ADD', () => {
    const res = evaluate([
      { operation: TokenADD.type, operand1: '1', operand2: '2' },
    ]);

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(3);
  });

  test('SUB', () => {
    const res = evaluate([
      { operation: TokenSUB.type, operand1: '1', operand2: '2' },
    ]);

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(-1);
  });

  test('MUL', () => {
    const res = evaluate([
      { operation: TokenMUL.type, operand1: '2', operand2: '3' },
    ]);

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(6);
  });

  test('DIV', () => {
    const res = evaluate([
      { operation: TokenDIV.type, operand1: '4', operand2: '2' },
    ]);

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(2);
  });

  test('DIV by zero', () => {
    const res = evaluate([
      { operation: TokenDIV.type, operand1: '4', operand2: '0' },
    ]);

    expect(res.isValid).toBe(false);
  });

  test('Nested operands', () => {
    const res = evaluate([
      { operation: TokenADD.type, operand1: '1', operand2: '2' },
      { operation: TokenADD.type, operand1: 'POP', operand2: '3' },
    ]);

    expect(res.isValid).toBe(true);
    expect(res.result).toBe(6);
  });

  test('Invalid operation', () => {
    const res = evaluate([
      { operation: TokenADD.type, operand1: '1', operand2: '2' },
      { operation: 'Invalid' as 'PUSH', operand1: 'POP', operand2: '3' },
    ]);

    expect(res.isValid).toBe(false);
  });

  test('Invalid code', () => {
    const res = evaluate([
      { operation: TokenADD.type, operand1: 'POP', operand2: '3' },
    ]);

    expect(res.isValid).toBe(false);
  });

  test('Invalid input', () => {
    try {
      evaluate([
        { operation: TokenADD.type, operand1: {} as string, operand2: '3' },
      ]);
      expect(true).toBe(false);
    } catch (error) {
      expect(true).toBe(true);
    }
  });
});
