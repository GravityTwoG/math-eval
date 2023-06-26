import { Token, TokenType } from './lexer';

// Expression: ( (-)? BegExpr EndExpr? )
// Expression starts with: "-", "(", CONST
// Expression ends with: CONST, ")"

// BegExpr: ( CONST )
// BegExpr: ( "(" Expression ")" )
// BegExpr starts with: CONST, "("

// EndExpr: [+-/*^] Expression
// EndExpr starts with: "+", "-", "/", "*", "^"

export type ParseResult = {
  isValid: boolean;
  message: string;
  postfix: string[];
};

export function parse(tokens: Token[]): ParseResult {
  if (tokens.length === 0 || tokens[0].type === TokenType.EOF) {
    return { isValid: true, message: '', postfix: [] };
  }

  const postfix: string[] = [];
  const opStack: string[] = [];
  const states: (
    | 'ExpressionStart'
    | 'Expression'
    | 'ExpressionEnd'
    | 'BegExpr'
    | 'EndExpr'
    | 'ParensExprEnd'
    | 'EndExprEnd'
    | TokenType.ADD
    | TokenType.SUB
    | TokenType.MUL
    | TokenType.DIV
    | TokenType.POW
    | TokenType.PAREN_OPEN
    | TokenType.PAREN_CLOSE
    | TokenType.CONST
  )[] = ['Expression'];

  let index = 0;
  let token = tokens[index];
  while (states.length) {
    const currentState = states.pop();

    switch (currentState) {
      case 'Expression': {
        if (
          token.type === TokenType.CONST ||
          token.type === TokenType.SUB ||
          token.type === TokenType.PAREN_OPEN
        ) {
          states.push('ExpressionEnd', 'BegExpr', 'ExpressionStart');
        } else {
          return {
            isValid: false,
            message: `Unexpected token: "${token.type}:${token.value}" in Expression`,
            postfix,
          };
        }
        break;
      }

      case 'ExpressionStart': {
        if (
          token.type === TokenType.CONST ||
          token.type === TokenType.PAREN_OPEN
        ) {
          continue;
        } else if (token.type === TokenType.SUB) {
          postfix.push('0');
          opStack.push(TokenType.SUB);
          states.push(TokenType.SUB); // get next token
        } else {
          return {
            isValid: false,
            message: `Unexpected token: "${token.type}:${token.value}" in ExpressionStart`,
            postfix,
          };
        }
        break;
      }

      case 'BegExpr': {
        if (token.type === TokenType.CONST) {
          states.push(TokenType.CONST); // get next token
          postfix.push(token.value);
        } else if (token.type === TokenType.PAREN_OPEN) {
          states.push(
            'ParensExprEnd',
            TokenType.PAREN_CLOSE,
            'Expression',
            TokenType.PAREN_OPEN
          );

          opStack.push(token.type);
        } else {
          return {
            isValid: false,
            message: `Unexpected token: "${token.type}: ${token.value}" in BegExpr`,
            postfix,
          };
        }
        break;
      }

      case 'ExpressionEnd': {
        if (
          token.type === TokenType.ADD ||
          token.type === TokenType.SUB ||
          token.type === TokenType.DIV ||
          token.type === TokenType.MUL ||
          token.type === TokenType.POW
        ) {
          states.push('EndExpr');
        } else if (token.type === TokenType.PAREN_CLOSE) {
          if (
            peek(states) === TokenType.PAREN_CLOSE ||
            states[states.length - 2] === TokenType.PAREN_CLOSE
          ) {
            continue;
          }
          return {
            isValid: false,
            message: `Unexpected token: "${token.type}:${token.value}" in ExpressionEnd`,
            postfix,
          };
        } else if (
          token.type === TokenType.EOF &&
          (states.length === 0 || peek(states) === 'EndExprEnd')
        ) {
          continue;
        } else {
          return {
            isValid: false,
            message: `Unexpected token: "${token.type}:${token.value}" in ExpressionEnd2`,
            postfix,
          };
        }
        break;
      }

      case 'EndExpr': {
        if (
          token.type === TokenType.ADD ||
          token.type === TokenType.SUB ||
          token.type === TokenType.DIV ||
          token.type === TokenType.MUL ||
          token.type === TokenType.POW
        ) {
          states.push('EndExprEnd');
          states.push('Expression');

          if (
            opStack.length &&
            getPriority(peek(opStack)) >= getPriority(token.type)
          ) {
            // operation with higher priority goes first
            postfix.push(opStack.pop() as string);
          }

          states.push(token.type);
          opStack.push(token.type);
        } else {
          return {
            isValid: false,
            message: `Unexpected token: "${token.type}:${token.value}" in EndExpr`,
            postfix,
          };
        }

        break;
      }

      case 'ParensExprEnd': {
        if (opStack.length && peek(opStack) === TokenType.PAREN_OPEN) {
          opStack.pop();
        }
        break;
      }

      case 'EndExprEnd': {
        if (opStack.length) {
          if (peek(opStack) === TokenType.PAREN_OPEN) {
            opStack.pop();
          } else {
            postfix.push(opStack.pop() as string);
          }
        }
        break;
      }

      default: {
        // validate needed token type
        if (currentState !== token.type) {
          return {
            isValid: false,
            message: `Invalid token: ${token.value}, expected: ${currentState}`,
            postfix,
          };
        }

        if (index < tokens.length) {
          index++;
          token = tokens[index];
        }
        break;
      }
    }
  }

  while (opStack.length) {
    if (peek(opStack) == TokenType.PAREN_OPEN) {
      opStack.pop();
    } else {
      postfix.push(opStack.pop() as string);
    }
  }

  return { isValid: true, message: 'Content is valid', postfix };
}

function peek<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

const operationPriorities = {
  [TokenType.PAREN_OPEN]: 0,
  [TokenType.ADD]: 5,
  [TokenType.SUB]: 5,
  [TokenType.MUL]: 10,
  [TokenType.DIV]: 10,
  [TokenType.POW]: 15,
} as { [key: string]: number };

function getPriority(operation: string) {
  if (operationPriorities[operation] !== undefined) {
    return operationPriorities[operation];
  }

  return 0;
}
