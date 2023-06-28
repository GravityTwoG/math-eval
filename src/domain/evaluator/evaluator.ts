import { TokenType } from '../types';
import { Command } from '../toPseudoCode/toPseudoCode';

export type EvaluationResult = {
  isValid: boolean;
  message: string;
  result: number;
};

export function evaluate(commands: Command[]): EvaluationResult {
  const stack: number[] = [];

  function extractOperand(operand: string) {
    if (operand === 'POP') {
      if (stack.length === 0) {
        throw {
          isValid: false,
          message: `Invalid operand: POP`,
          result: NaN,
        };
      }

      return stack.pop() as number;
    }

    return parseFloat(operand);
  }

  try {
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

          if (operand2 === 0) {
            return {
              isValid: false,
              message: `Division by zero`,
              result: NaN,
            };
          }

          stack.push(operand1 / operand2);
          break;
        }
        case TokenType.POW: {
          const operand2 = extractOperand(command.operand2);
          const operand1 = extractOperand(command.operand1);

          stack.push(Math.pow(operand1, operand2));
          break;
        }
        case 'PUSH':
          stack.push(extractOperand(command.operand1));
          break;
        default:
          return {
            isValid: false,
            message: `Unexpected operation: ${command.operation}`,
            result: NaN,
          };
      }
    }
  } catch (error) {
    if (isEvaluationResult(error)) {
      return error;
    }
    throw error;
  }

  if (stack.length === 0) {
    return { isValid: false, message: 'Empty', result: NaN };
  }

  return { isValid: true, message: '', result: stack[stack.length - 1] };
}

function isEvaluationResult(error: unknown): error is EvaluationResult {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isValid' in error &&
    'result' in error &&
    'message' in error &&
    typeof error.isValid === 'boolean' &&
    typeof error.message === 'string' &&
    typeof error.result === 'number'
  );
}
