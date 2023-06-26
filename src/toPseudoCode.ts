import { TokenType } from './lexer';

export type Command = {
  operation:
    | TokenType.ADD
    | TokenType.SUB
    | TokenType.MUL
    | TokenType.DIV
    | TokenType.POW;
  operand1: string;
  operand2: string;
};

export function toPseudoCode(postfix: string[]) {
  const pseudoCode: Command[] = [];
  const opStack: string[] = [];

  for (let i = 0; i < postfix.length; i++) {
    const word = postfix[i];

    switch (word) {
      case TokenType.ADD:
      case TokenType.SUB:
      case TokenType.MUL:
      case TokenType.DIV:
      case TokenType.POW: {
        if (opStack.length >= 2) {
          pseudoCode.push({
            operation: word,
            operand1: opStack.pop() as string,
            operand2: opStack.pop() as string,
          });
          opStack.push('POP');
        } else {
          return {
            isValid: false,
            pseudoCode,
          };
        }
        break;
      }
      default:
        if (word.match(/[0-9]+/)) {
          opStack.push(word);
        } else {
          return {
            isValid: false,
            pseudoCode,
          };
        }
    }
  }

  return { isValid: true, pseudoCode };
}
