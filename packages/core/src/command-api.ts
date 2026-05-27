import type { Editor } from "@tiptap/core";

/* ------------------------------------------------------------------ */
/*  The extension-specific commands (toggleBold, setImage, etc.) are   */
/*  only available when the corresponding TipTap extensions are       */
/*  registered.  We widen the type here so these wrappers work        */
/*  regardless of whether TypeScript can see the extension augment.   */
/* ------------------------------------------------------------------ */

export function toggleBold(editor: Editor): void {
    (editor.chain().focus() as any).toggleBold().run();
}

export function toggleItalic(editor: Editor): void {
    (editor.chain().focus() as any).toggleItalic().run();
}

export function toggleUnderline(editor: Editor): void {
    if ((editor.can() as any).toggleUnderline()) {
        (editor.chain().focus() as any).toggleUnderline().run();
    }
}

export function toggleStrike(editor: Editor): void {
    (editor.chain().focus() as any).toggleStrike().run();
}

export function toggleHeading(editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6): void {
    (editor.chain().focus() as any).toggleHeading({ level }).run();
}

export function toggleBulletList(editor: Editor): void {
    (editor.chain().focus() as any).toggleBulletList().run();
}

export function toggleOrderedList(editor: Editor): void {
    (editor.chain().focus() as any).toggleOrderedList().run();
}

export function toggleBlockquote(editor: Editor): void {
    (editor.chain().focus() as any).toggleBlockquote().run();
}

export function toggleCodeBlock(editor: Editor): void {
    (editor.chain().focus() as any).toggleCodeBlock().run();
}

export function insertImage(
    editor: Editor,
    attrs: { src: string; alt?: string; title?: string },
): void {
    (editor.chain().focus() as any).setImage(attrs).run();
}

export function setLink(editor: Editor, attrs: { href: string; target?: string }): void {
    (editor.chain().focus() as any).setLink(attrs).run();
}

export function undo(editor: Editor): void {
    (editor.chain().focus() as any).undo().run();
}

export function redo(editor: Editor): void {
    (editor.chain().focus() as any).redo().run();
}
