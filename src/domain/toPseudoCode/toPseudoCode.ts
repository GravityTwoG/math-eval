import { TokenType } from '../types';

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
  commands: Command[];
};

export function toPseudoCode(postfix: string[]): ToPseudoCodeResult {
  const commands: Command[] = [];
  const opStack: string[] = [];

  for (let i = 0; i < postfix.length; i++) {
    const word = postfix[i];

    switch (word) {
      case TokenType.ADD:
      case TokenType.SUB:
      case TokenType.MUL:
      case TokenType.DIV: {
        if (opStack.length >= 2) {
          commands.push({
            operation: word,
            operand2: opStack.pop() as string,
            operand1: opStack.pop() as string,
          });
          opStack.push('POP');
        } else {
          return {
            isValid: false,
            commands,
          };
        }
        break;
      }
      default:
        if (word.match(/[0-9.]+/)) {
          opStack.push(word);
        } else {
          return {
            isValid: false,
            commands,
          };
        }
    }
  }

  if (opStack.length && opStack[opStack.length - 1] !== 'POP') {
    return {
      isValid: true,
      commands: [
        {
          operation: 'PUSH',
          operand1: opStack.shift() as string,
          operand2: '',
        },
      ],
    };
  }

  return { isValid: true, commands };
}
