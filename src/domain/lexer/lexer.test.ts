import { describe, expect, test } from '@jest/globals';

import { getLexems } from './lexer';

import {
  TokenType,
  TokenADD,
  TokenDIV,
  TokenEOF,
  TokenMUL,
  TokenPAREN_CLOSE,
  TokenPAREN_OPEN,
  TokenSUB,
  TokenPOW,
} from '../types';

describe('Lexer', () => {
  test('Empty string is valid', () => {
    const res = getLexems('');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([TokenEOF]);
  });

  test('Spaces are ignored', () => {
    const res = getLexems('         ');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([TokenEOF]);
  });

  test('Int constant is valid', () => {
    const res = getLexems('1');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '1' },
      TokenEOF,
    ]);
  });

  test('Float constant is valid', () => {
    const res = getLexems('1.1');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '1.1' },
      TokenEOF,
    ]);
  });

  test('1 + 2 - 3 * 4 / 5 - (1.1 + 0.5) is valid', () => {
    const res = getLexems('1 + 2 - 3 * 4 / 5 - (1.1 + 0.5)');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenSUB,
      { type: TokenType.CONST, value: '3' },
      TokenMUL,
      { type: TokenType.CONST, value: '4' },
      TokenDIV,
      { type: TokenType.CONST, value: '5' },
      TokenSUB,
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1.1' },
      TokenADD,
      { type: TokenType.CONST, value: '0.5' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);
  });

  test('2 + 3^(1 + 2) is valid', () => {
    const res = getLexems('2 + 3^(1 + 2)');

    expect(res.isValid).toBe(true);
    expect(res.lexems).toStrictEqual([
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '3' },
      TokenPOW,
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);
  });

  test('. is not valid', () => {
    const res = getLexems(' .        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([TokenEOF]);
  });
  test('1. is not valid', () => {
    const res = getLexems(' 1.        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([TokenEOF]);
  });
  test('1.. is not valid', () => {
    const res = getLexems(' 1..        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([TokenEOF]);
  });
  test('1. + is not valid', () => {
    const res = getLexems(' 1. +        ');

    expect(res.isValid).toBe(false);
    expect(res.lexems).toStrictEqual([TokenEOF]);
  });

  test('2 + abc is not valid', () => {
    const res = getLexems('2 + abc');

    expect(res.isValid).toBe(false);
  });
});
