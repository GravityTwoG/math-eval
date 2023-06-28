import { TokenType } from '.';

const operationPriorities = {
  [TokenType.PAREN_OPEN]: 0,
  [TokenType.ADD]: 5,
  [TokenType.SUB]: 5,
  [TokenType.MUL]: 10,
  [TokenType.DIV]: 10,
  [TokenType.POW]: 15,
} as { [key: string]: number };

export function getPriority(operation: string) {
  if (operationPriorities[operation] !== undefined) {
    return operationPriorities[operation];
  }

  return 0;
}
