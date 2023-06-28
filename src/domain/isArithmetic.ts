import { ArithmeticToken, Token, TokenType } from './types';

export function isArithmetic(token: Token): token is ArithmeticToken {
  return (
    token.type === TokenType.ADD ||
    token.type === TokenType.SUB ||
    token.type === TokenType.MUL ||
    token.type === TokenType.DIV
  );
}