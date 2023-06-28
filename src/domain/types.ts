export enum TokenType {
  ADD = 'ADD',
  SUB = 'SUB',
  MUL = 'MUL',
  DIV = 'DIV',
  CONST = 'CONST',
  PAREN_OPEN = 'PAREN_OPEN',
  PAREN_CLOSE = 'PAREN_CLOSE',
  EOF = 'EOF',
}

export type Token = { type: TokenType; value: string };

export type ArithmeticToken = {
  type: TokenType.ADD | TokenType.SUB | TokenType.MUL | TokenType.DIV;
  value: '+' | '-' | '*' | '/';
};

export const TokenEOF = { type: TokenType.EOF, value: '' };

export const TokenADD = {
  type: TokenType.ADD,
  value: '+' as const,
} satisfies ArithmeticToken;

export const TokenSUB = {
  type: TokenType.SUB,
  value: '-' as const,
} satisfies ArithmeticToken;

export const TokenMUL = {
  type: TokenType.MUL,
  value: '*' as const,
} satisfies ArithmeticToken;

export const TokenDIV = {
  type: TokenType.DIV,
  value: '/' as const,
} satisfies ArithmeticToken;

export const TokenPAREN_OPEN = {
  type: TokenType.PAREN_OPEN,
  value: '(' as const,
} satisfies Token;

export const TokenPAREN_CLOSE = {
  type: TokenType.PAREN_CLOSE,
  value: ')' as const,
} satisfies Token;
