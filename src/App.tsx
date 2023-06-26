import { useState, useEffect } from 'react';
import './App.css';

import { Input } from './components/Input';
import { getLexems, Token } from './lexer';
import { ParseResult, parse } from './parser';
import { Command, toPseudoCode } from './toPseudoCode';

export function App() {
  const [expression, setExpression] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [parseResult, setParseResult] = useState<ParseResult>({
    isValid: true,
    message: '',
    postfix: [],
  });
  const [intermediate, setIntermediate] = useState<{
    isValid: boolean;
    pseudoCode: Command[];
  }>({
    isValid: true,
    pseudoCode: [],
  });

  useEffect(() => {
    const lexems = getLexems(expression);
    setTokens(lexems);
    const parseRes = parse(lexems);
    setParseResult(parseRes);
    setIntermediate(toPseudoCode(parseRes.postfix));
  }, [expression]);

  return (
    <div>
      <h1>Math Expression Evaluator</h1>

      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <Input
          value={expression}
          onChange={(v) => setExpression(v)}
          pattern="([0-9]|[+* \^\-\/\(\)])+"
          type="text"
          style={{ width: '100%' }}
        />
      </div>

      <h2>Tokens</h2>
      <p>
        {tokens.map((token, idx) => (
          <span key={idx}>
            {token.type}: {token.value}{' '}
          </span>
        ))}
      </p>
      <p>Is valid: {parseResult.isValid.toString()}</p>
      {!parseResult.isValid && <p>Error: {parseResult.message}</p>}

      <h2>Postfix Notation</h2>
      <p>{parseResult.postfix.join(' ')}</p>

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
    </div>
  );
}
