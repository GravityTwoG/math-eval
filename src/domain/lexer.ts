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
  value: string;
};

export type LexerResult = {
  isValid: boolean;
  message: string;
  lexems: Token[];
};

export function getLexems(content: string): LexerResult {
  const lexems: Token[] = [];

  let constant = '';
  let wasDot = false;
  let isConst = false;

  for (let i = 0; i < content.length; i++) {
    const char = content.charAt(i);

    if (char.match(/[0-9]/)) {
      constant += char;
      isConst = true;
    } else if (char === '.') {
      if (!isConst) {
        lexems.push({ type: TokenType.EOF, value: '' });
        return { isValid: false, message: 'Unexpected symbol "."', lexems };
      }
      if (wasDot) {
        lexems.push({ type: TokenType.EOF, value: '' });
        return { isValid: false, message: 'Unexpected symbol "."', lexems };
      }
      wasDot = true;
      constant += char;
    } else if (char === ' ') {
      continue;
    } else {
      if (isConst) {
        if (constant[constant.length - 1] === '.') {
          lexems.push({ type: TokenType.EOF, value: '' });
          return { isValid: false, message: 'Unexpected symbol "."', lexems };
        }

        lexems.push({ type: TokenType.CONST, value: constant });
        isConst = false;
        wasDot = false;
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
        case '(': {
          lexems.push({ type: TokenType.PAREN_OPEN, value: char });
          break;
        }
        case ')': {
          lexems.push({ type: TokenType.PAREN_CLOSE, value: char });
          break;
        }
      }
    }
  }

  if (isConst) {
    if (constant[constant.length - 1] === '.') {
      lexems.push({ type: TokenType.EOF, value: '' });
      return { isValid: false, message: 'Unexpected symbol "."', lexems };
    }

    lexems.push({ type: TokenType.CONST, value: constant });
    isConst = false;
    constant = '';
  }
  lexems.push({ type: TokenType.EOF, value: '' });

  return { isValid: true, message: '', lexems };
}
