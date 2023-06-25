export enum TokenType {
  ADD = 'ADD',
  SUB = 'SUB',
  MUL = 'MUL',
  DIV = 'DIV',
  POW = 'POW',
  CONST = 'CONST',
  PAREN = 'PAREN',
}

export type Token = { type: TokenType; value: string };

export function Lexer(content: string) {
  const lexems: Token[] = [];

  let constant = '';
  let isConst = false;

  for (let i = 0; i < content.length; i++) {
    const char = content.charAt(i);

    if (char.match(/[0-9]/)) {
      constant += char;
      isConst = true;
    } else if (char === ' ') {
      continue;
    } else {
      if (isConst) {
        lexems.push({ type: TokenType.CONST, value: constant });
        isConst = false;
        constant = '';
      }

      switch (char) {
        case '+': {
          lexems.push({ type: TokenType.ADD, value: char });
          break;
        }
        case '-': {
          lexems.push({ type: TokenType.SUB, value: char });
          break;
        }
        case '*': {
          lexems.push({ type: TokenType.MUL, value: char });
          break;
        }
        case '/': {
          lexems.push({ type: TokenType.DIV, value: char });
          break;
        }
        case '^': {
          lexems.push({ type: TokenType.POW, value: char });
          break;
        }
        case '(': {
          lexems.push({ type: TokenType.PAREN, value: char });
          break;
        }
        case ')': {
          lexems.push({ type: TokenType.PAREN, value: char });
          break;
        }
      }
    }
  }

  if (isConst) {
    lexems.push({ type: TokenType.CONST, value: constant });
    isConst = false;
    constant = '';
  }

  return lexems;
}
