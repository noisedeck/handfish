/**
 * Default Tokenizer - Plain text fallback
 * Returns the entire line as a single TEXT token with no highlighting.
 * @module components/code-editor/tokenizers/default
 */

/**
 * Plain text tokenizer that returns the whole line as a single token.
 * @param {string} line - A single line of text
 * @returns {Array<{type: string, text: string}>}
 */
function defaultTokenizer(line) {
    return [{ type: 'text', text: line }]
}

export { defaultTokenizer }
