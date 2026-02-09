/**
 * Global Escape Key Handler
 * Manages Escape key behavior for closing modals, dialogs, dropdowns, etc.
 * Uses a stack-based approach so the most recently opened element closes first.
 *
 * @module utils/escapeHandler
 */

/** @type {Array<{element: HTMLElement, close: Function}>} Stack of closeable elements */
const escapeStack = []

/**
 * Register an element to be closed when Escape is pressed.
 * Call this when opening a modal, dialog, or dropdown.
 *
 * @param {HTMLElement} element - The element that was opened
 * @param {Function} closeFunction - Function to call to close the element
 */
export function registerEscapeable(element, closeFunction) {
    // Remove any existing entry for this element (in case of re-registration)
    unregisterEscapeable(element)
    escapeStack.push({ element, close: closeFunction })
}

/**
 * Unregister an element from the escape stack.
 * Call this when the element is closed.
 *
 * @param {HTMLElement} element - The element to unregister
 */
export function unregisterEscapeable(element) {
    const index = escapeStack.findIndex(entry => entry.element === element)
    if (index !== -1) {
        escapeStack.splice(index, 1)
    }
}

/**
 * Close the topmost element in the escape stack.
 * @returns {boolean} True if something was closed, false if stack was empty
 */
export function closeTopmost() {
    if (escapeStack.length === 0) return false

    const entry = escapeStack.pop()
    entry.close()
    return true
}

/**
 * Check if there are any registered escapeable elements
 * @returns {boolean}
 */
export function hasOpenEscapeables() {
    return escapeStack.length > 0
}

/**
 * Initialize the global escape key handler.
 * Should be called once when the app starts.
 */
export function initEscapeHandler() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (closeTopmost()) {
                e.preventDefault()
                e.stopPropagation()
            }
        }
    })
}
