import { useState, useEffect } from 'react';
import './App.css';

import { Input } from './components/Input';
import { getLexems, LexerResult } from './lexer';
import { ParserResult, parse } from './parser';
import { Command, toPseudoCode } from './toPseudoCode';
import { evaluate } from './evaluator';

export function App() {
  const [expression, setExpression] = useState('');
  const [lexerResult, setLexerResult] = useState<LexerResult>({
    isValid: true,
    message: 'Empty',
    lexems: [],
  });
  const [parseResult, setParseResult] = useState<ParserResult>({
    isValid: true,
    message: '',
    postfix: [],
  });
  const [intermediate, setIntermediate] = useState<{
    isValid: boolean;
    pseudoCode: Command[];
  }>({
    isValid: false,
    pseudoCode: [],
  });
  const [evaluationResult, setEvaluationResult] = useState<{
    isValid: boolean;
    message: string;
    result: number;
  }>({ isValid: false, message: 'PseudoCode is invalid', result: 0 });

  useEffect(() => {
    const lexRes = getLexems(expression);
    setLexerResult(lexRes);
    const parseRes = parse(lexRes.lexems);
    setParseResult(parseRes);

    if (!parseRes.isValid) {
      setIntermediate({
        isValid: false,
        pseudoCode: [],
      });
      setEvaluationResult({
        isValid: false,
        message: 'PseudoCode is invalid',
        result: 0,
      });
    } else {
      const inter = toPseudoCode(parseRes.postfix);
      setIntermediate(inter);

      if (!inter.isValid) {
        setEvaluationResult({
          isValid: false,
          message: 'PseudoCode is invalid',
          result: 0,
        });
      } else {
        setEvaluationResult(evaluate(inter.pseudoCode));
      }
    }
  }, [expression]);

  return (
    <div>
      <h1>Math Expression Evaluator</h1>

      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <Input
          value={expression}
          onChange={(v) => setExpression(v)}
          pattern="(([0-9]+)|([+*\^\-\/\(\) \.]))+"
          type="text"
          style={{ width: '100%' }}
        />
      </div>

      <h2>Lexer Result</h2>
      {!lexerResult.isValid && <p>Error: {lexerResult.message}</p>}
      <p>
        Tokens:{' '}
        {lexerResult.lexems.map((token, idx) => (
          <span key={idx}>
            {token.type}: {token.value}{' '}
          </span>
        ))}
      </p>

      <h2>Parser Result</h2>
      {!parseResult.isValid && <p>Error: {parseResult.message}</p>}
      <p>Postfix Notation: {parseResult.postfix.join(' ')}</p>

      <h2>PseudoCode</h2>
      <p>Is valid: {intermediate.isValid.toString()}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table>
          <tbody>
            {intermediate.pseudoCode.map((command, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{command.operation}</td>
                <td>{command.operand1}</td>
                <td>{command.operand2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Result</h2>
      {!evaluationResult.isValid && <p>Error: {evaluationResult.message}</p>}
      <p>{evaluationResult.result}</p>
    </div>
  );
}
