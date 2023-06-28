import { describe, expect, test } from '@jest/globals';

import { parse } from './parser';

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

describe('Parser', () => {
  test('EOF must be provided', () => {
    const res = parse([]);

    expect(res.isValid).toBe(false);
    expect(res.postfix).toStrictEqual([]);
  });

  test('Empty expression is valid', () => {
    const res = parse([TokenEOF]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([]);
  });

  test('CONST is valid', () => {
    const res = parse([{ type: TokenType.CONST, value: '1.1' }, TokenEOF]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual(['1.1']);
  });

  test('SUB CONST is valid', () => {
    const res = parse([
      TokenSUB,
      { type: TokenType.CONST, value: '1.1' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual(['0', '1.1', TokenSUB.type]);
  });

  test('CONST ADD CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1.1' },
      TokenADD,
      { type: TokenType.CONST, value: '2.2' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual(['1.1', '2.2', TokenADD.type]);
  });

  test('PAREN_OPEN CONST PAREN_CLOSE  is valid', () => {
    const res = parse([
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1.1' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual(['1.1']);
  });

  test('PAREN_OPEN CONST ADD CONST PAREN_CLOSE  is valid', () => {
    const res = parse([
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1.1' },
      TokenADD,
      { type: TokenType.CONST, value: '2.2' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual(['1.1', '2.2', TokenADD.type]);
  });

  test('CONST ADD CONST ADD CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '3' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      TokenADD.type,
      '3',
      TokenADD.type,
    ]);
  });

  test('CONST POW CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenPOW,
      { type: TokenType.CONST, value: '2' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual(['1', '2', TokenPOW.type]);
  });

  test('CONST POW CONST POW CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenPOW,
      { type: TokenType.CONST, value: '2' },
      TokenPOW,
      { type: TokenType.CONST, value: '3' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      '3',
      TokenPOW.type,
      TokenPOW.type,
    ]);
  });

  test('CONST ADD CONST POW CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenPOW,
      { type: TokenType.CONST, value: '3' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      '3',
      TokenPOW.type,
      TokenADD.type,
    ]);
  });

  test('CONST MUL CONST ADD is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenMUL,
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '3' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      TokenMUL.type,
      '3',
      TokenADD.type,
    ]);
  });

  test('CONST ADD CONST MUL is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenMUL,
      { type: TokenType.CONST, value: '3' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      '3',
      TokenMUL.type,
      TokenADD.type,
    ]);
  });

  test('CONST SUB SUB CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '10' },
      TokenSUB,
      TokenSUB,
      { type: TokenType.CONST, value: '5' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '10',
      '0',
      '5',
      TokenSUB.type,
      TokenSUB.type,
    ]);
  });

  test('CONST MUL CONST SUB CONST MUL CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '2' },
      TokenMUL,
      { type: TokenType.CONST, value: '3' },
      TokenSUB,
      { type: TokenType.CONST, value: '4' },
      TokenMUL,
      { type: TokenType.CONST, value: '5' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '2',
      '3',
      TokenMUL.type,
      '4',
      '5',
      TokenMUL.type,
      TokenSUB.type,
    ]);
  });

  test('CONST MUL CONST SUB CONST MUL CONST ADD CONST is valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '2' },
      TokenMUL,
      { type: TokenType.CONST, value: '3' },
      { type: TokenType.SUB, value: '+' },
      { type: TokenType.CONST, value: '4' },
      TokenMUL,
      { type: TokenType.CONST, value: '5' },
      TokenADD,
      { type: TokenType.CONST, value: '6' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '2',
      '3',
      TokenMUL.type,
      '4',
      '5',
      TokenMUL.type,
      TokenSUB.type,
      '6',
      TokenADD.type,
    ]);
  });

  test('PAREN_OPEN CONST ADD CONST PAREN_CLOSE MUL CONST SUB PAREN_OPEN CONST ADD CONST PAREN_CLOSE is valid', () => {
    const res = parse([
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenPAREN_CLOSE,

      TokenMUL,
      { type: TokenType.CONST, value: '3' },

      TokenSUB,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '4' },
      TokenADD,
      { type: TokenType.CONST, value: '5' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      TokenADD.type,
      '3',
      TokenMUL.type,
      '4',
      '5',
      TokenADD.type,
      TokenSUB.type,
    ]);
  });

  test('Nested Parenthesis is valid', () => {
    const res = parse([
      TokenPAREN_OPEN,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      { type: TokenType.CONST, value: '2' },
      TokenPAREN_CLOSE,
      TokenMUL,
      { type: TokenType.CONST, value: '3' },
      TokenSUB,
      { type: TokenType.CONST, value: '4' },
      TokenPAREN_CLOSE,

      TokenDIV,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '5' },
      TokenSUB,
      { type: TokenType.CONST, value: '6' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '1',
      '2',
      TokenADD.type,
      '3',
      TokenMUL.type,
      '4',
      TokenSUB.type,
      '5',
      '6',
      TokenSUB.type,
      TokenDIV.type,
    ]);
  });

  test('Expression with negative CONST is valid', () => {
    const res = parse([
      TokenSUB,
      { type: TokenType.CONST, value: '5' },
      TokenMUL,

      TokenPAREN_OPEN,
      TokenSUB,
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '7' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '0',
      '5',
      TokenSUB.type,
      '0',
      '2',
      TokenSUB.type,
      '7',
      TokenADD.type,
      TokenMUL.type,
    ]);
  });

  test('Negative Expression is valid', () => {
    const res = parse([
      TokenSUB,
      TokenPAREN_OPEN,
      TokenSUB,
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '7' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '0',
      '0',
      '2',
      TokenSUB.type,
      '7',
      TokenADD.type,
      TokenSUB.type,
    ]);
  });

  test('Negative Expression is valid', () => {
    const res = parse([
      TokenSUB,
      TokenPAREN_OPEN,
      TokenSUB,
      { type: TokenType.CONST, value: '1' },
      TokenPAREN_CLOSE,
      TokenADD,
      { type: TokenType.CONST, value: '1' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '0',
      '0',
      '1',
      TokenSUB.type,
      TokenSUB.type,
      '1',
      TokenADD.type,
    ]);
  });

  test('Negative Expression is valid', () => {
    const res = parse([
      TokenSUB,
      TokenPAREN_OPEN,
      TokenSUB,
      TokenPAREN_OPEN,
      TokenSUB,
      TokenPAREN_OPEN,
      TokenSUB,
      { type: TokenType.CONST, value: '1' },
      TokenPAREN_CLOSE,
      TokenPAREN_CLOSE,
      TokenPAREN_CLOSE,
      TokenADD,
      { type: TokenType.CONST, value: '1' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '0',
      '0',
      '0',
      '0',
      '1',
      TokenSUB.type,
      TokenSUB.type,
      TokenSUB.type,
      TokenSUB.type,
      '1',
      TokenADD.type,
    ]);
  });

  test('Complex nested parenthesis is valid', () => {
    // ((2 + 3) * (4 + 5)) / ((6 + 7) * (8 + 9))
    const res = parse([
      TokenPAREN_OPEN,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '3' },
      TokenPAREN_CLOSE,

      TokenMUL,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '4' },
      TokenADD,
      { type: TokenType.CONST, value: '5' },
      TokenPAREN_CLOSE,

      TokenPAREN_CLOSE,

      TokenDIV,

      TokenPAREN_OPEN,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '6' },
      TokenADD,
      { type: TokenType.CONST, value: '7' },
      TokenPAREN_CLOSE,

      TokenMUL,

      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '8' },
      TokenADD,
      { type: TokenType.CONST, value: '9' },
      TokenPAREN_CLOSE,

      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(true);
    expect(res.postfix).toStrictEqual([
      '2',
      '3',
      TokenADD.type,
      '4',
      '5',
      TokenADD.type,
      TokenMUL.type,
      '6',
      '7',
      TokenADD.type,
      '8',
      '9',
      TokenADD.type,
      TokenMUL.type,
      TokenDIV.type,
    ]);
  });

  // Invalid expressions
  test('CONST CONST is not valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      { type: TokenType.CONST, value: '2' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(false);
  });

  test('PAREN_OPEN CONST ADD CONST  is not valid', () => {
    const res = parse([
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1.1' },
      TokenADD,
      { type: TokenType.CONST, value: '2.2' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(false);
  });

  test('PAREN_OPEN  is not valid', () => {
    const res = parse([TokenPAREN_OPEN, TokenEOF]);

    expect(res.isValid).toBe(false);
  });

  test('ADD  is not valid', () => {
    const res = parse([TokenADD, TokenEOF]);

    expect(res.isValid).toBe(false);
  });

  test('PAREN_OPEN  is not valid', () => {
    const res = parse([TokenPAREN_CLOSE, TokenEOF]);

    expect(res.isValid).toBe(false);
  });

  test('PAREN_OPEN PAREN_CLOSE  is not valid', () => {
    const res = parse([TokenPAREN_OPEN, TokenPAREN_CLOSE, TokenEOF]);

    expect(res.isValid).toBe(false);
  });

  test('PAREN_CLOSE  is not valid', () => {
    const res = parse([TokenPAREN_CLOSE, TokenEOF]);

    expect(res.isValid).toBe(false);
  });

  test('CONST PAREN_CLOSE is not valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(false);
  });

  test('CONST ADD PAREN_CLOSE is not valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '1' },
      TokenADD,
      TokenPAREN_CLOSE,
      TokenEOF,
    ]);

    expect(res.isValid).toBe(false);
  });

  test('No opening parenthesis not valid', () => {
    const res = parse([
      { type: TokenType.CONST, value: '2' },
      TokenADD,
      { type: TokenType.CONST, value: '3' },
      TokenPAREN_CLOSE,
      TokenMUL,
      { type: TokenType.CONST, value: '4' },

      TokenEOF,
    ]);

    expect(res.isValid).toBe(false);
  });

  test('PAREN_OPEN CONST is not valid', () => {
    const res = parse([
      TokenPAREN_OPEN,
      { type: TokenType.CONST, value: '1.1' },
      TokenEOF,
    ]);

    expect(res.isValid).toBe(false);
  });
});
