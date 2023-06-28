import {
  Token,
  TokenADD,
  TokenDIV,
  TokenEOF,
  TokenMUL,
  TokenPAREN_CLOSE,
  TokenPAREN_OPEN,
  TokenPOW,
  TokenSUB,
  TokenType,
} from '../types';

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
        lexems.push(TokenEOF);
        return { isValid: false, message: 'Unexpected symbol "."', lexems };
      }
      if (wasDot) {
        lexems.push(TokenEOF);
        return { isValid: false, message: 'Unexpected symbol "."', lexems };
      }
      wasDot = true;
      constant += char;
    } else if (char === ' ') {
      continue;
    } else {
      if (isConst) {
        if (constant[constant.length - 1] === '.') {
          lexems.push(TokenEOF);
          return { isValid: false, message: 'Unexpected symbol "."', lexems };
        }

        lexems.push({ type: TokenType.CONST, value: constant });
        isConst = false;
        wasDot = false;
        constant = '';
      }

      switch (char) {
        case TokenADD.value: {
          lexems.push(TokenADD);
          break;
        }
        case TokenSUB.value: {
          lexems.push(TokenSUB);
          break;
        }
        case TokenMUL.value: {
          lexems.push(TokenMUL);
          break;
        }
        case TokenDIV.value: {
          lexems.push(TokenDIV);
          break;
        }
        case TokenPOW.value: {
          lexems.push(TokenPOW);
          break;
        }
        case TokenPAREN_OPEN.value: {
          lexems.push(TokenPAREN_OPEN);
          break;
        }
        case TokenPAREN_CLOSE.value: {
          lexems.push(TokenPAREN_CLOSE);
          break;
        }
        default: {
          return {
            isValid: false,
            message: `Unexpected symbol: ${char}`,
            lexems,
          };
        }
      }
    }
  }

  if (isConst) {
    if (constant[constant.length - 1] === '.') {
      lexems.push(TokenEOF);
      return { isValid: false, message: 'Unexpected symbol "."', lexems };
    }

    lexems.push({ type: TokenType.CONST, value: constant });
    isConst = false;
    constant = '';
  }
  lexems.push(TokenEOF);

  return { isValid: true, message: '', lexems };
}
