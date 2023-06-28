import classes from './tokenslist.module.css';

import { Token, isArithmetic } from '../../domain';

import { Text } from '../Text';

export type TokensListProps = {
  tokens: Token[];
};

export const TokensList = (props: TokensListProps) => {
  return (
    <div>
      <Text>Lexer translates expression to sequence of tokens.</Text>

      <Text>Tokens:</Text>
      <ul className={classes['tokens-list']}>
        {props.tokens.map((token, idx) => (
          <TokenItem key={idx} token={token} />
        ))}
      </ul>
    </div>
  );
};

type TokenItemProps = { token: Token };

const TokenItem = ({ token }: TokenItemProps) => {
  return (
    <li
      className={classes['token-item']}
      data-token-type={isArithmetic(token) ? 'ARITHMETIC' : token.type}
    >
      <span className={classes['token-value']}>{token.value}</span>
      <span className={classes['token-type']}>{token.type}</span>
    </li>
  );
};
