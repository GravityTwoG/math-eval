import { describe, expect, test } from '@jest/globals';
import { TokenType, getLexems } from './lexer';

describe('Lexer', () => {
  test('Empty string is valid', () => {
    const res = getLexems('');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([{ type: TokenType.EOF, value: '' }]);
  });

  test('Spaces are ignored', () => {
    const res = getLexems('         ');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([{ type: TokenType.EOF, value: '' }]);
  });

  test('Int constant is valid', () => {
    const res = getLexems('1');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '1' },
      { type: TokenType.EOF, value: '' },
    ]);
  });

  test('Float constant is valid', () => {
    const res = getLexems('1.1');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '1.1' },
      { type: TokenType.EOF, value: '' },
    ]);
  });

  test('1 + 2 - 3 * 4 / 5 - (1.1 + 0.5) is valid', () => {
    const res = getLexems('1 + 2 - 3 * 4 / 5 - (1.1 + 0.5)');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '1' },
      { type: TokenType.ADD, value: '+' },
      { type: TokenType.CONST, value: '2' },
      { type: TokenType.SUB, value: '-' },
      { type: TokenType.CONST, value: '3' },
      { type: TokenType.MUL, value: '*' },
      { type: TokenType.CONST, value: '4' },
      { type: TokenType.DIV, value: '/' },
      { type: TokenType.CONST, value: '5' },
      { type: TokenType.SUB, value: '-' },
      { type: TokenType.PAREN_OPEN, value: '(' },
      { type: TokenType.CONST, value: '1.1' },
      { type: TokenType.ADD, value: '+' },
      { type: TokenType.CONST, value: '0.5' },
      { type: TokenType.PAREN_CLOSE, value: ')' },
      { type: TokenType.EOF, value: '' },
    ]);
  });

  test('. is not valid', () => {
    const res = getLexems(' .        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([{ type: TokenType.EOF, value: '' }]);
  });
  test('1. is not valid', () => {
    const res = getLexems(' 1.        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([{ type: TokenType.EOF, value: '' }]);
  });
  test('1.. is not valid', () => {
    const res = getLexems(' 1..        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([{ type: TokenType.EOF, value: '' }]);
  });
  test('1. + is not valid', () => {
    const res = getLexems(' 1. +        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([{ type: TokenType.EOF, value: '' }]);
  });
});
