import { TokenType } from './lexer';
import { Command } from './toPseudoCode';

export function evaluate(commands: Command[]) {
  const stack: number[] = [];

  function extractOperand(operand: string) {
    if (operand === 'POP') {
      return stack.pop() as number;
    }

    return parseInt(operand);
  }

  for (const command of commands) {
    switch (command.operation) {
      case TokenType.ADD:
        stack.push(
          extractOperand(command.operand2) + extractOperand(command.operand1)
        );
        break;
      case TokenType.SUB:
        stack.push(
          extractOperand(command.operand2) - extractOperand(command.operand1)
        );
        break;
      case TokenType.MUL:
        stack.push(
          extractOperand(command.operand2) * extractOperand(command.operand1)
        );
        break;
      case TokenType.DIV:
        stack.push(
          extractOperand(command.operand2) / extractOperand(command.operand1)
        );
        break;
      case TokenType.POW:
        stack.push(
          Math.pow(
            extractOperand(command.operand2),
            extractOperand(command.operand1)
          )
        );
        break;
      default:
        throw `Invalid Operation: ${command.operation}`;
    }
  }

  return stack[stack.length - 1];
}
