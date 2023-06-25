import { Token } from './lexer';

// Expression: ( (-)? BegExpr EndExpr? )

// BegExpr: ( Const )

// BegExpr: ( "(" Expression ")" )

// EndExpr: Sign Expression

// Sign: [+-/*^]

export function parse(tokens: Token[]) {
  return true;
}
