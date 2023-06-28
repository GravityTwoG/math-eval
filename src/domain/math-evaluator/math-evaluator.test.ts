import { describe, expect, test } from '@jest/globals';
import { evaluateExpression } from '..';

describe('Math Evaluator', () => {
  test('1 + 2 = 3', () => {
    const res = evaluateExpression('1 + 2 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(3);
  });

  test('1 - 2 = -1', () => {
    const res = evaluateExpression('1 - 2 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(-1);
  });

  test('1 - (2 + 1) = -2', () => {
    const res = evaluateExpression('1 - (2 + 1) ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(-2);
  });

  test('10 - -5 = 15', () => {
    const res = evaluateExpression('10 - -5 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(15);
  });

  test('10 - -5 - 15 = 0', () => {
    const res = evaluateExpression('10 - -5 - 15 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(0);
  });

  test('1 * 2 = 2', () => {
    const res = evaluateExpression('1 * 2 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(2);
  });

  test('1 / 2 = 0.5', () => {
    const res = evaluateExpression('1 / 2 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(0.5);
  });

  test('1 / 2 / 2 = 0.25', () => {
    const res = evaluateExpression('1 / 2 / 2');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(0.25);
  });

  test('2 ^ 3 = 8', () => {
    const res = evaluateExpression('2 ^ 3 ');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(8);
  });

  test('2 ^ 3 ^ 2 = 512', () => {
    const res = evaluateExpression('2 ^ 3 ^ 2');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(512);
  });

  test('2 * 3 ^ 2 = 18', () => {
    const res = evaluateExpression('2 * 3 ^ 2');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(true);
    expect(res.pseudoCode.isValid).toBe(true);
    expect(res.evaluated.isValid).toBe(true);
    expect(res.evaluated.result).toBe(18);
  });

  test('2 + abc is not valid', () => {
    const res = evaluateExpression('2 + abc');

    expect(res.lexer.isValid).toBe(false);
    expect(res.parser.isValid).toBe(false);
    expect(res.pseudoCode.isValid).toBe(false);
    expect(res.evaluated.isValid).toBe(false);
  });

  test('2 + ) is not valid', () => {
    const res = evaluateExpression('2 + )');

    expect(res.lexer.isValid).toBe(true);
    expect(res.parser.isValid).toBe(false);
    expect(res.pseudoCode.isValid).toBe(false);
    expect(res.evaluated.isValid).toBe(false);
  });
});
