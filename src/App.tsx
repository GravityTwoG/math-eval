import { useState, useEffect } from 'react';
import classes from './app.module.css';

import { evaluateExpression } from './domain';

import { TextArea } from './components/TextArea';
import { TokensList } from './components/TokensList';
import { PostfixView } from './components/PostfixView';
import { PseudoCodeView } from './components/PseudoCodeView';
import { Text } from './components/Text';

export function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<ReturnType<typeof evaluateExpression>>({
    lexer: {
      isValid: true,
      message: '',
      lexems: [],
    },
    parser: {
      isValid: true,
      message: '',
      postfix: [],
    },
    pseudoCode: { isValid: false, commands: [] },
    evaluated: { isValid: false, message: '', result: NaN },
  });

  useEffect(() => {
    try {
      setResult(evaluateExpression(expression));
    } catch (error) {
      alert(error);
    }
  }, [expression]);

  return (
    <div className={classes.app}>
      <h1>Math Expression Evaluator</h1>

      <div className={classes['expression-input']}>
        <TextArea
          value={expression}
          onChange={(v) => setExpression(v)}
          pattern={/[0-9. +*\-/()]+/g}
          style={{ width: '100%', maxWidth: '900px' }}
          rows={3}
          placeholder="2 + 2 * 2"
          autoFocus
          isValid={result.parser.isValid}
        />
      </div>

      <h2>Result</h2>
      {!result.evaluated.isValid && expression.trim() !== '' && (
        <Text>Error: {result.evaluated.message}</Text>
      )}
      <Text>{result.evaluated.result.toLocaleString()}</Text>

      <h2>Lexer Result</h2>
      {!result.lexer.isValid && <Text>Error: {result.lexer.message}</Text>}
      <TokensList tokens={result.lexer.lexems} />

      <h2>Parser Result</h2>
      {!result.parser.isValid && <Text>Error: {result.parser.message}</Text>}
      <PostfixView postfix={result.parser.postfix} />

      <h2>Pseudocode</h2>
      {!result.pseudoCode.isValid && (
        <Text>Is valid: {result.pseudoCode.isValid.toString()}</Text>
      )}

      <PseudoCodeView pseudoCode={result.pseudoCode.commands} />

      <h2>Result</h2>
      {!result.evaluated.isValid && expression.trim() !== '' && (
        <Text>Error: {result.evaluated.message}</Text>
      )}
      <Text>
        Then pseudocode is executed one by one while saving results of executed
        commands in execution stack. If command requires an execution result of
        previous command (POP), then value of operand is extracted from the
        execution stack.
      </Text>
      <Text>{result.evaluated.result.toLocaleString()}</Text>

      <footer className={classes.footer}>
        Made by{' '}
        <a
          href="https://github.com/GravityTwoG/math-eval"
          target="_blank"
          rel="noopener noreferrer"
        >
          GravityTwoG
        </a>
      </footer>
    </div>
  );
}
