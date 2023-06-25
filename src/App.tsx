import { useState, useEffect } from 'react';
import './App.css';

import { Input } from './components/Input';
import { getLexems, Token } from './lexer';
import { ParseResult, parse } from './parser';

export function App() {
  const [expression, setExpression] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [parseResult, setParseResult] = useState<ParseResult>({
    isValid: true,
    message: '',
    postfix: [],
  });

  useEffect(() => {
    const lexems = getLexems(expression);
    setTokens(lexems);
    setParseResult(parse(lexems));
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
    </div>
  );
}
