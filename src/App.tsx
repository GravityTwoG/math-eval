import { useState, useEffect } from 'react';
import './App.css';

import { Input } from './components/Input';
import { Lexer, Token } from './lexer';

export function App() {
  const [expression, setExpression] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    setTokens(Lexer(expression));
  }, [expression]);

  return (
    <div>
      <Input
        value={expression}
        onChange={(v) => setExpression(v)}
        pattern="([0-9]|[+* \^\-\/\(\)])+"
        type="text"
      />

      <p>
        {tokens.map((token, idx) => (
          <span key={idx}>
            {token.type}: {token.value}{' '}
          </span>
        ))}
      </p>
    </div>
  );
}
