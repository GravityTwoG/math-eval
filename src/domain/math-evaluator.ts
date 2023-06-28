import { getLexems } from './lexer/lexer';
import { parse } from './parser/parser';
import { toPseudoCode } from './toPseudoCode/toPseudoCode';
import { evaluate } from './evaluator/evaluator';

export function evaluateExpression(expression: string) {
  const lexerResult = getLexems(expression);
  const parserResult = parse(lexerResult.lexems);

  if (!parserResult.isValid) {
    return {
      lexer: lexerResult,
      parser: parserResult,
      pseudoCode: { isValid: false, commands: [] },
      evaluated: { isValid: false, message: '', result: NaN },
    };
  }

  const pseudoCode = toPseudoCode(parserResult.postfix);

  if (!pseudoCode.isValid) {
    return {
      lexer: lexerResult,
      parser: parserResult,
      pseudoCode: { isValid: false, commands: [] },
      evaluated: {
        isValid: false,
        message: '',
        result: NaN,
      },
    };
  }

  return {
    lexer: lexerResult,
    parser: parserResult,
    pseudoCode: pseudoCode,
    evaluated: evaluate(pseudoCode.commands),
  };
}
