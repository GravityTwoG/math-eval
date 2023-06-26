import { TokenType } from './lexer';

export function isArithmetic(type: TokenType) {
  return (
    type === TokenType.ADD ||
    type === TokenType.SUB ||
    type === TokenType.MUL ||
    type === TokenType.DIV
  );
}
