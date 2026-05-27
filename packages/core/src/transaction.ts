import type { Editor } from "@tiptap/core";

/**
 * Create a chainable transaction from the given editor.
 * Proxies to TipTap's built-in `editor.chain()` for fluent command chaining.
 */
export function createChain(editor: Editor): ReturnType<Editor["chain"]> {
    return editor.chain();
}
