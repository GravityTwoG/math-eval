import { ArithmeticToken, Token, TokenType } from './types';

export function isArithmeticOperation(
  operation: string
): operation is ArithmeticToken['type'] {
  return (
    operation === TokenType.ADD ||
    operation === TokenType.SUB ||
    operation === TokenType.MUL ||
    operation === TokenType.DIV ||
    operation === TokenType.POW
  );
}

export function isArithmeticToken(token: Token): token is ArithmeticToken {
  return isArithmeticOperation(token.type);
}
