import { useMemo } from 'react';
import classes from './postfix-view.module.css';

import { TokenType } from '../../domain';

import { Text } from '../Text';

export type PostfixViewProps = {
  postfix: string[];
};

export const PostfixView = (props: PostfixViewProps) => {
  const tree = useMemo(() => postfixToTree(props.postfix), [props.postfix]);

  return (
    <div>
      <Text>
        Parser checks validity of sequence of tokens and translates it to{' '}
        <strong>postfix notation</strong>.
      </Text>

      <Text>
        <strong>Reverse Polish notation (RPN)</strong>, also known as{' '}
        <strong>postfix notation</strong>, is a mathematical notation in which
        operators follow their operands. It does not need any parentheses as
        long as each operator has a fixed number of operands.
      </Text>
      <Text>Postfix Notation:</Text>
      <div>{props.postfix.join(' ')}</div>

      <div className={classes['postfix-tree']}>
        {tree.map((p, idx) => (
          <PostfixNodeView postfix={p} key={idx} />
        ))}
      </div>
    </div>
  );
};

type PostfixNodeViewProps = {
  postfix: PostfixNode | string;
  className?: string;
};

const PostfixNodeView = ({ postfix, className }: PostfixNodeViewProps) => {
  if (typeof postfix === 'string') {
    return (
      <span
        className={`${classes['postfix-node-view-operand']} ${className || ''}`}
      >
        {postfix}
      </span>
    );
  }

  return (
    <span className={`${classes['postfix-node-view']} ${className || ''}`}>
      <span className={classes['postfix-node-hover']} />
      <PostfixNodeView
        postfix={postfix.operand1}
        className={classes['postfix-node-view-operand1']}
      />
      <PostfixNodeView
        postfix={postfix.operand2}
        className={classes['postfix-node-view-operand2']}
      />
      <span className={classes['postfix-node-view-operation']}>
        {postfix.operation}
      </span>
    </span>
  );
};

type PostfixNode = {
  operation: string;
  operand1: string | PostfixNode;
  operand2: string | PostfixNode;
};

function postfixToTree(postfix: string[]) {
  const stack: (PostfixNode | string)[] = [];

  for (let i = 0; i < postfix.length; i++) {
    const word = postfix[i];

    switch (word) {
      case TokenType.ADD:
      case TokenType.SUB:
      case TokenType.MUL:
      case TokenType.DIV: {
        if (stack.length >= 2) {
          stack.push({
            operation: word,
            operand2: stack.pop() as string,
            operand1: stack.pop() as string,
          });
        } else {
          return stack;
        }
        break;
      }
      default:
        if (word.match(/[0-9.]+/)) {
          stack.push(word);
        } else {
          return stack;
        }
    }
  }

  return stack;
}
