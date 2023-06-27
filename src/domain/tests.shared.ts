import { ArithmeticToken, TokenType } from './lexer';

export const TokenEOF = { type: TokenType.EOF, value: '' };
export const TokenADD: ArithmeticToken = { type: TokenType.ADD, value: '+' };
export const TokenSUB: ArithmeticToken = { type: TokenType.SUB, value: '-' };
export const TokenMUL: ArithmeticToken = { type: TokenType.MUL, value: '*' };
export const TokenDIV: ArithmeticToken = { type: TokenType.DIV, value: '/' };
export const TokenPAREN_OPEN = { type: TokenType.PAREN_OPEN, value: '(' };
export const TokenPAREN_CLOSE = { type: TokenType.PAREN_CLOSE, value: ')' };
