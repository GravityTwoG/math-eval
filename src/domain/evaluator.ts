import { TokenType } from './lexer';
import { Command } from './toPseudoCode';

export function evaluate(commands: Command[]) {
  const stack: number[] = [];

  function extractOperand(operand: string) {
    if (operand === 'POP') {
      return stack.pop() as number;
    }

    return parseFloat(operand);
  }

  for (const command of commands) {
    switch (command.operation) {
      case TokenType.ADD: {
        const operand2 = extractOperand(command.operand2);
        const operand1 = extractOperand(command.operand1);

        stack.push(operand1 + operand2);
        break;
      }
      case TokenType.SUB: {
        const operand2 = extractOperand(command.operand2);
        const operand1 = extractOperand(command.operand1);

        stack.push(operand1 - operand2);
        break;
      }
      case TokenType.MUL: {
        const operand2 = extractOperand(command.operand2);
        const operand1 = extractOperand(command.operand1);

        stack.push(operand1 * operand2);
        break;
      }
      case TokenType.DIV: {
        const operand2 = extractOperand(command.operand2);
        const operand1 = extractOperand(command.operand1);

        stack.push(operand1 / operand2);
        break;
      }
      case 'PUSH':
        stack.push(extractOperand(command.operand1));
        break;
      default:
        return {
          isValid: false,
          message: `Invalid Operation: ${command.operation}`,
          result: 0,
        };
    }
  }

  return { isValid: true, message: '', result: stack[stack.length - 1] };
}
