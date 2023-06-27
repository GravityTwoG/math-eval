import { useState, useEffect } from 'react';
import './App.css';

import { getLexems, LexerResult } from './domain/lexer';
import { ParserResult, parse } from './domain/parser';
import { Command, toPseudoCode } from './domain/toPseudoCode';
import { evaluate } from './domain/evaluator';

import { TextArea } from './components/TextArea';
import { TokensList } from './components/TokensList';
import { PostfixView } from './components/PostfixView';
import { PseudoCodeView } from './components/PseudoCodeView';

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
    try {
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
          message: '',
          result: NaN,
        });
      } else {
        const inter = toPseudoCode(parseRes.postfix);
        setIntermediate(inter);

        if (!inter.isValid) {
          setEvaluationResult({
            isValid: false,
            message: '',
            result: NaN,
          });
        } else {
          setEvaluationResult(evaluate(inter.pseudoCode));
        }
      }
    } catch (error) {
      alert(error);
    }
  }, [expression]);

  return (
    <div style={{ width: '100%' }}>
      <h1>Math Expression Evaluator</h1>

      <div style={{ width: '100%' }}>
        <TextArea
          value={expression}
          onChange={(v) => setExpression(v)}
          pattern={/[0-9. +*\-/()]+/g}
          style={{ width: '100%' }}
          rows={3}
          placeholder="2 + 2 * 2"
          autoFocus
          isValid={parseResult.isValid}
        />
      </div>

      <h2>Result</h2>
      {!evaluationResult.isValid && expression.trim() !== '' && (
        <p>Error: {evaluationResult.message}</p>
      )}
      <p>{evaluationResult.result.toLocaleString()}</p>

      <h2>Lexer Result</h2>
      {!lexerResult.isValid && <p>Error: {lexerResult.message}</p>}
      <TokensList tokens={lexerResult.lexems} />

      <h2>Parser Result</h2>
      {!parseResult.isValid && <p>Error: {parseResult.message}</p>}
      <PostfixView postfix={parseResult.postfix} />

      <h2>PseudoCode</h2>
      <p>Is valid: {intermediate.isValid.toString()}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PseudoCodeView pseudoCode={intermediate.pseudoCode} />
      </div>
    </div>
  );
}
