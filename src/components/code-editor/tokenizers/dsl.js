/**
 * DSL Tokenizer for Noisemaker DSL syntax
 * @module components/code-editor/tokenizers/dsl
 */

/**
 * Token types for syntax highlighting
 */
const TokenType = {
    COMMENT: 'comment',
    STRING: 'string',
    NUMBER: 'number',
    COLOR: 'color',
    BOOLEAN: 'boolean',
    NULL: 'null',
    KEYWORD: 'keyword',
    FUNCTION: 'function',
    PARAMETER: 'parameter',
    OUTPUT: 'output',
    PUNCTUATION: 'punctuation',
    OPERATOR: 'operator',
    IDENTIFIER: 'identifier',
    TEXT: 'text'
}

/**
 * DSL keywords and built-in functions
 */
const DSL_KEYWORDS = new Set(['true', 'false', 'null'])
const DSL_OUTPUTS = new Set(['o0', 'o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7'])

/**
 * Tokenize a line of DSL code for syntax highlighting.
 * Returns an array of { type, text } objects.
 * @param {string} line - A single line of DSL code
 * @returns {Array<{type: string, text: string}>}
 */
function dslTokenizer(line) {
    const tokens = []
    let i = 0
    const length = line.length

    function peek(offset = 0) {
        return line[i + offset]
    }

    function isDigit(ch) {
        return ch >= '0' && ch <= '9'
    }

    function isHex(ch) {
        return isDigit(ch) || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F')
    }

    function isIdentStart(ch) {
        return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || ch === '_'
    }

    function isIdent(ch) {
        return isIdentStart(ch) || isDigit(ch)
    }

    while (i < length) {
        const ch = peek()

        // Single-line comment
        if (ch === '/' && peek(1) === '/') {
            tokens.push({ type: TokenType.COMMENT, text: line.slice(i) })
            break
        }

        // Multi-line comment start (just highlight to end of line)
        if (ch === '/' && peek(1) === '*') {
            let commentEnd = line.indexOf('*/', i + 2)
            if (commentEnd === -1) {
                tokens.push({ type: TokenType.COMMENT, text: line.slice(i) })
                break
            } else {
                tokens.push({ type: TokenType.COMMENT, text: line.slice(i, commentEnd + 2) })
                i = commentEnd + 2
                continue
            }
        }

        // Whitespace - preserve as plain text
        if (ch === ' ' || ch === '\t') {
            let ws = ''
            while (i < length && (peek() === ' ' || peek() === '\t')) {
                ws += line[i++]
            }
            tokens.push({ type: TokenType.TEXT, text: ws })
            continue
        }

        // String literal (single or double quotes)
        if (ch === '"' || ch === '\'') {
            const quote = ch
            let str = ch
            i++
            while (i < length && peek() !== quote) {
                if (peek() === '\\' && i + 1 < length) {
                    str += line[i++]
                }
                str += line[i++]
            }
            if (i < length) {
                str += line[i++] // closing quote
            }
            tokens.push({ type: TokenType.STRING, text: str })
            continue
        }

        // Hex color literal
        if (ch === '#') {
            let color = '#'
            i++
            while (i < length && isHex(peek())) {
                color += line[i++]
            }
            tokens.push({ type: TokenType.COLOR, text: color })
            continue
        }

        // Number literal
        if (isDigit(ch) || (ch === '.' && isDigit(peek(1)))) {
            let num = ''
            if (ch === '.') {
                num = '0'
            }
            while (i < length && isDigit(peek())) {
                num += line[i++]
            }
            if (peek() === '.') {
                num += line[i++]
                while (i < length && isDigit(peek())) {
                    num += line[i++]
                }
            }
            tokens.push({ type: TokenType.NUMBER, text: num })
            continue
        }

        // Operators
        if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '?' || ch === '<' || ch === '>' || ch === '=') {
            tokens.push({ type: TokenType.OPERATOR, text: ch })
            i++
            continue
        }

        // Punctuation
        if (ch === '(' || ch === ')' || ch === '{' || ch === '}' || ch === '[' || ch === ']' || ch === ',' || ch === ':' || ch === '.') {
            tokens.push({ type: TokenType.PUNCTUATION, text: ch })
            i++
            continue
        }

        // Identifier / keywords / functions
        if (isIdentStart(ch)) {
            let id = ''
            while (i < length && isIdent(peek())) {
                id += line[i++]
            }

            // Check what follows to determine token type
            if (DSL_KEYWORDS.has(id)) {
                tokens.push({ type: id === 'null' ? TokenType.NULL : TokenType.BOOLEAN, text: id })
            } else if (DSL_OUTPUTS.has(id)) {
                tokens.push({ type: TokenType.OUTPUT, text: id })
            } else if (peek() === '(') {
                tokens.push({ type: TokenType.FUNCTION, text: id })
            } else if (peek() === ':') {
                tokens.push({ type: TokenType.PARAMETER, text: id })
            } else {
                tokens.push({ type: TokenType.IDENTIFIER, text: id })
            }
            continue
        }

        // Unknown character - just add as text
        tokens.push({ type: TokenType.TEXT, text: ch })
        i++
    }

    return tokens
}

export { dslTokenizer, TokenType, DSL_KEYWORDS, DSL_OUTPUTS }
