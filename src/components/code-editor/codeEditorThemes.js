/**
 * Code Editor Themes
 *
 * Defines color themes for the code editor component.
 * Each theme provides CSS custom property values for syntax highlighting.
 *
 * @module components/code-editor/codeEditorThemes
 */

/**
 * Available editor themes
 * Each theme defines colors for syntax highlighting and editor UI
 */
export const EDITOR_THEMES = {
    // Default dark theme - GitHub Dark inspired
    default: {
        name: 'GitHub Dark',
        colors: {
            '--hl-comment': '#6a737d',
            '--hl-string': '#9ecbff',
            '--hl-number': '#79b8ff',
            '--hl-color': '#ffab70',
            '--hl-boolean': '#ff7b72',
            '--hl-null': '#ff7b72',
            '--hl-function': '#d2a8ff',
            '--hl-parameter': '#ffa657',
            '--hl-output': '#7ee787',
            '--hl-punctuation': '#e0e0e0',
            '--hl-operator': '#ff7b72',
            '--hl-identifier': '#e0e0e0',
            '--text-bg-color': '#000',
            '--code-editor-caret-color': '#5a7fdd',
            '--code-editor-selection-bg': '#5a7fdd',
            '--code-editor-selection-fg': '#ffffff',
            '--code-editor-gutter-bg': 'rgba(7, 9, 13, 0.75)',
            '--code-editor-line-number-color': '#666'
        }
    },

    // Monokai - Classic sublime text theme
    monokai: {
        name: 'Monokai',
        colors: {
            '--hl-comment': '#75715e',
            '--hl-string': '#e6db74',
            '--hl-number': '#ae81ff',
            '--hl-color': '#fd971f',
            '--hl-boolean': '#ae81ff',
            '--hl-null': '#ae81ff',
            '--hl-function': '#a6e22e',
            '--hl-parameter': '#fd971f',
            '--hl-output': '#66d9ef',
            '--hl-punctuation': '#f8f8f2',
            '--hl-operator': '#f92672',
            '--hl-identifier': '#f8f8f2',
            '--text-bg-color': '#272822',
            '--code-editor-caret-color': '#f8f8f2',
            '--code-editor-selection-bg': '#49483e',
            '--code-editor-selection-fg': '#f8f8f2',
            '--code-editor-gutter-bg': 'rgba(39, 40, 34, 0.9)',
            '--code-editor-line-number-color': '#90908a'
        }
    },

    // Dracula - Popular dark theme
    dracula: {
        name: 'Dracula',
        colors: {
            '--hl-comment': '#6272a4',
            '--hl-string': '#f1fa8c',
            '--hl-number': '#bd93f9',
            '--hl-color': '#ffb86c',
            '--hl-boolean': '#bd93f9',
            '--hl-null': '#bd93f9',
            '--hl-function': '#50fa7b',
            '--hl-parameter': '#ffb86c',
            '--hl-output': '#8be9fd',
            '--hl-punctuation': '#f8f8f2',
            '--hl-operator': '#ff79c6',
            '--hl-identifier': '#f8f8f2',
            '--text-bg-color': '#282a36',
            '--code-editor-caret-color': '#f8f8f2',
            '--code-editor-selection-bg': '#44475a',
            '--code-editor-selection-fg': '#f8f8f2',
            '--code-editor-gutter-bg': 'rgba(40, 42, 54, 0.9)',
            '--code-editor-line-number-color': '#6272a4'
        }
    },

    // Nord - Cool, arctic color palette
    nord: {
        name: 'Nord',
        colors: {
            '--hl-comment': '#616e88',
            '--hl-string': '#a3be8c',
            '--hl-number': '#b48ead',
            '--hl-color': '#d08770',
            '--hl-boolean': '#b48ead',
            '--hl-null': '#b48ead',
            '--hl-function': '#88c0d0',
            '--hl-parameter': '#d08770',
            '--hl-output': '#8fbcbb',
            '--hl-punctuation': '#d8dee9',
            '--hl-operator': '#81a1c1',
            '--hl-identifier': '#d8dee9',
            '--text-bg-color': '#2e3440',
            '--code-editor-caret-color': '#d8dee9',
            '--code-editor-selection-bg': '#434c5e',
            '--code-editor-selection-fg': '#eceff4',
            '--code-editor-gutter-bg': 'rgba(46, 52, 64, 0.9)',
            '--code-editor-line-number-color': '#4c566a'
        }
    },

    // Solarized Dark - Low contrast dark theme
    solarizedDark: {
        name: 'Solarized Dark',
        colors: {
            '--hl-comment': '#586e75',
            '--hl-string': '#2aa198',
            '--hl-number': '#d33682',
            '--hl-color': '#cb4b16',
            '--hl-boolean': '#d33682',
            '--hl-null': '#d33682',
            '--hl-function': '#268bd2',
            '--hl-parameter': '#cb4b16',
            '--hl-output': '#859900',
            '--hl-punctuation': '#839496',
            '--hl-operator': '#dc322f',
            '--hl-identifier': '#839496',
            '--text-bg-color': '#002b36',
            '--code-editor-caret-color': '#839496',
            '--code-editor-selection-bg': '#073642',
            '--code-editor-selection-fg': '#93a1a1',
            '--code-editor-gutter-bg': 'rgba(0, 43, 54, 0.9)',
            '--code-editor-line-number-color': '#586e75'
        }
    },

    // Solarized Light - Light theme variant
    solarizedLight: {
        name: 'Solarized Light',
        colors: {
            '--hl-comment': '#93a1a1',
            '--hl-string': '#2aa198',
            '--hl-number': '#d33682',
            '--hl-color': '#cb4b16',
            '--hl-boolean': '#d33682',
            '--hl-null': '#d33682',
            '--hl-function': '#268bd2',
            '--hl-parameter': '#cb4b16',
            '--hl-output': '#859900',
            '--hl-punctuation': '#657b83',
            '--hl-operator': '#dc322f',
            '--hl-identifier': '#657b83',
            '--text-bg-color': '#fdf6e3',
            '--code-editor-caret-color': '#657b83',
            '--code-editor-selection-bg': '#eee8d5',
            '--code-editor-selection-fg': '#586e75',
            '--code-editor-gutter-bg': 'rgba(253, 246, 227, 0.95)',
            '--code-editor-line-number-color': '#93a1a1'
        }
    },

    // One Dark - Atom editor theme
    oneDark: {
        name: 'One Dark',
        colors: {
            '--hl-comment': '#5c6370',
            '--hl-string': '#98c379',
            '--hl-number': '#d19a66',
            '--hl-color': '#d19a66',
            '--hl-boolean': '#d19a66',
            '--hl-null': '#d19a66',
            '--hl-function': '#61afef',
            '--hl-parameter': '#e5c07b',
            '--hl-output': '#56b6c2',
            '--hl-punctuation': '#abb2bf',
            '--hl-operator': '#c678dd',
            '--hl-identifier': '#abb2bf',
            '--text-bg-color': '#282c34',
            '--code-editor-caret-color': '#528bff',
            '--code-editor-selection-bg': '#3e4451',
            '--code-editor-selection-fg': '#abb2bf',
            '--code-editor-gutter-bg': 'rgba(40, 44, 52, 0.9)',
            '--code-editor-line-number-color': '#4b5263'
        }
    },

    // GitHub Light - Light mode theme
    githubLight: {
        name: 'GitHub Light',
        colors: {
            '--hl-comment': '#6a737d',
            '--hl-string': '#032f62',
            '--hl-number': '#005cc5',
            '--hl-color': '#e36209',
            '--hl-boolean': '#005cc5',
            '--hl-null': '#005cc5',
            '--hl-function': '#6f42c1',
            '--hl-parameter': '#e36209',
            '--hl-output': '#22863a',
            '--hl-punctuation': '#24292e',
            '--hl-operator': '#d73a49',
            '--hl-identifier': '#24292e',
            '--text-bg-color': '#ffffff',
            '--code-editor-caret-color': '#24292e',
            '--code-editor-selection-bg': '#c8e1ff',
            '--code-editor-selection-fg': '#24292e',
            '--code-editor-gutter-bg': 'rgba(255, 255, 255, 0.95)',
            '--code-editor-line-number-color': '#959da5'
        }
    }
}

/**
 * List of theme keys for validation
 */
export const THEME_KEYS = Object.keys(EDITOR_THEMES)

/**
 * Apply a theme to a code editor element
 * @param {HTMLElement} editorElement - The code-editor element to theme
 * @param {string} themeName - The theme key to apply
 */
export function applyEditorTheme(editorElement, themeName) {
    const theme = EDITOR_THEMES[themeName] || EDITOR_THEMES.default

    // Apply all color variables to the editor element
    for (const [property, value] of Object.entries(theme.colors)) {
        editorElement.style.setProperty(property, value)
    }
}

/**
 * Apply a theme to all code editors in the document
 * @param {string} themeName - The theme key to apply
 */
export function applyEditorThemeGlobal(themeName) {
    const theme = EDITOR_THEMES[themeName] || EDITOR_THEMES.default
    const editors = document.querySelectorAll('code-editor')

    editors.forEach(editor => {
        for (const [property, value] of Object.entries(theme.colors)) {
            editor.style.setProperty(property, value)
        }
    })
}
