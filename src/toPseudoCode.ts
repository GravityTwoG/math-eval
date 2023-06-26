import { TokenType } from './lexer';

export type Command = {
  operation:
    | TokenType.ADD
    | TokenType.SUB
    | TokenType.MUL
    | TokenType.DIV
    | 'PUSH';
  operand1: string;
  operand2: string;
};

export type ToPseudoCodeResult = {
  isValid: boolean;
  pseudoCode: Command[];
};

export function toPseudoCode(postfix: string[]): ToPseudoCodeResult {
  const pseudoCode: Command[] = [];
  const opStack: string[] = [];

  for (let i = 0; i < postfix.length; i++) {
    const word = postfix[i];

    switch (word) {
      case TokenType.ADD:
      case TokenType.SUB:
      case TokenType.MUL:
      case TokenType.DIV: {
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

  if (opStack.length && opStack[opStack.length - 1] !== 'POP') {
    return {
      isValid: true,
      pseudoCode: [
        {
          operation: 'PUSH',
          operand1: opStack.shift() as string,
          operand2: '',
        },
      ],
    };
  }

  return { isValid: true, pseudoCode };
}
