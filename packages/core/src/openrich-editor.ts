import {
    Editor as TiptapEditor,
    Extension as TiptapExtension,
    Node as TiptapNode,
    Mark as TiptapMark,
} from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import type { OpenRichOptions, SerializedDoc, ThemeMode } from "./types";
import { I18nManager } from "./i18n";
import { ThemeManager } from "./theme";
import { serializeDoc } from "./serialization";
import { Node as Node_ } from "./base/node";
import { Mark as Mark_ } from "./base/mark";
import { Extension as Extension_ } from "./base/extension";

function createPlaceholderExtension(text: string) {
    return TiptapExtension.create({
        name: "openrichPlaceholder",
        addProseMirrorPlugins() {
            const key = new PluginKey("openrichPlaceholder");
            return [
                new Plugin({
                    key,
                    state: {
                        init() {
                            return DecorationSet.empty;
                        },
                        apply(tr, set: DecorationSet) {
                            return set.map(tr.mapping, tr.doc);
                        },
                    },
                    props: {
                        decorations(state) {
                            const doc = state.doc;
                            const isEmpty =
                                doc.childCount === 0 ||
                                (doc.childCount === 1 &&
                                    doc.firstChild?.isTextblock &&
                                    doc.firstChild.content.size === 0);

                            if (!isEmpty) return DecorationSet.empty;

                            const deco = Decoration.widget(0, () => {
                                const span = document.createElement("span");
                                span.className = "openrich-placeholder";
                                span.textContent = text;
                                return span;
                            });

                            return DecorationSet.create(doc, [deco]);
                        },
                    },
                }),
            ];
        },
    });
}

export class OpenRichEditor {
    private editor: TiptapEditor;
    private themeManager: ThemeManager;
    private i18nManager: I18nManager;
    private options: OpenRichOptions;

    constructor(options: OpenRichOptions = {}) {
        this.options = { ...options };

        this.i18nManager = new I18nManager(options.locale);
        this.themeManager = new ThemeManager(options.theme ?? "system");

        const extensions = this.buildExtensions(options);

        this.editor = new TiptapEditor({
            content: options.content,
            extensions,
            editable: options.editable ?? true,
            editorProps: {
                attributes: {
                    dir: this.i18nManager.getDir(),
                },
            },
            onUpdate: ({ editor }) => {
                const html = this.getHTML();
                options.onUpdate?.({ editor, content: html });
            },
            onFocus: ({ editor }) => {
                options.onFocus?.({ editor });
            },
            onBlur: ({ editor }) => {
                options.onBlur?.({ editor });
            },
        });

        this.themeManager.mount();
    }

    /* ------------------------------------------------------------------ */
    /*  Extension normalization                                            */
    /* ------------------------------------------------------------------ */

    private isTipTapExtension(ext: unknown): boolean {
        return (
            ext != null &&
            typeof (ext as any).name === "string" &&
            (ext as any).type === "extension"
        );
    }

    private normalizeExtension(ext: unknown): any {
        if (this.isTipTapExtension(ext)) {
            return ext;
        }

        if (ext instanceof Node_) {
            return this.normalizeNode(ext);
        }

        if (ext instanceof Mark_) {
            return this.normalizeMark(ext);
        }

        if (ext instanceof Extension_) {
            return this.normalizeExtension_(ext);
        }

        return ext;
    }

    private normalizeNode(ext: Node_): ReturnType<typeof TiptapNode.create> {
        const instance = ext;
        return TiptapNode.create({
            name: instance.name,
            schema: instance.schema,
            parseHTML() {
                return (instance.parseDOM ?? []) as any;
            },
            renderHTML({ node, HTMLAttributes }) {
                if (instance.toDOM) {
                    const result = instance.toDOM(node);
                    if (result) {
                        const [tag, attrs, content] = result;
                        return [tag, { ...HTMLAttributes, ...attrs }, content ?? 0];
                    }
                }
                return ["div", { ...HTMLAttributes }, 0];
            },
        });
    }

    private normalizeMark(ext: Mark_): ReturnType<typeof TiptapMark.create> {
        const instance = ext;
        return TiptapMark.create({
            name: instance.name,
            schema: instance.schema,
            parseHTML() {
                return (instance.parseDOM ?? []) as any;
            },
            renderHTML({ mark, HTMLAttributes }) {
                if (instance.toDOM) {
                    const result = instance.toDOM(mark);
                    if (result) {
                        const [tag, attrs] = result;
                        return [tag, { ...HTMLAttributes, ...attrs }];
                    }
                }
                return ["span", { ...HTMLAttributes }];
            },
        });
    }

    private normalizeExtension_(ext: Extension_): ReturnType<typeof TiptapExtension.create> {
        const instance = ext;
        return TiptapExtension.create({
            name: instance.name,
            addCommands: () => instance.addCommands(),
            addKeyboardShortcuts: () => instance.addKeyboardShortcuts(),
            addInputRules: () => instance.addInputRules() as any,
        });
    }

    /* ------------------------------------------------------------------ */
    /*  Extension building                                                 */
    /* ------------------------------------------------------------------ */

    private buildExtensions(options: OpenRichOptions): any[] {
        const exts: any[] = [];

        if (options.extensions) {
            for (const ext of options.extensions) {
                exts.push(this.normalizeExtension(ext));
            }
        }

        if (options.placeholder) {
            exts.push(createPlaceholderExtension(options.placeholder));
        }

        return exts;
    }

    /* ------------------------------------------------------------------ */
    /*  Public API                                                         */
    /* ------------------------------------------------------------------ */

    /** Return the underlying TipTap Editor instance. */
    get tiptapEditor(): TiptapEditor {
        return this.editor;
    }

    /** Return the editor's current HTML content. */
    getHTML(): string {
        return this.editor.getHTML();
    }

    /** Return the editor's current content as a JSON document. */
    getJSON(): Record<string, unknown> {
        return this.editor.getJSON() as Record<string, unknown>;
    }

    /** Return the editor's current content as plain text. */
    getText(): string {
        return this.editor.getText();
    }

    /** Return the editor's content serialized as Markdown. */
    getMarkdown(): string {
        return defaultMarkdownSerializer.serialize(this.editor.state.doc);
    }

    /** Return all serialization formats in one call. */
    getDoc(): SerializedDoc {
        return serializeDoc(this.editor);
    }

    /** Replace the editor content with the given HTML or JSON. */
    setContent(content: string | Record<string, unknown>): this {
        this.editor.commands.setContent(content);
        return this;
    }

    /** Toggle the editor's editable state. */
    setEditable(editable: boolean): this {
        this.editor.setEditable(editable);
        return this;
    }

    /** Set the editor's theme mode. */
    setTheme(mode: ThemeMode): this {
        this.options.theme = mode;
        this.themeManager.setTheme(mode);
        return this;
    }

    /** Set the editor's locale at runtime (re‑creates the editor content). */
    setLocale(locale: string | import("./types").LocaleConfig): this {
        this.options.locale = locale;
        this.i18nManager = new I18nManager(locale);

        // Update the editor's direction attribute
        this.editor.view.dom.setAttribute("dir", this.i18nManager.getDir());

        return this;
    }

    /** Return a chainable command API. */
    chain(): ReturnType<TiptapEditor["chain"]> {
        return this.editor.chain();
    }

    /** Return the current I18nManager instance. */
    getI18n(): I18nManager {
        return this.i18nManager;
    }

    /** Return the current ThemeManager instance. */
    getTheme(): ThemeManager {
        return this.themeManager;
    }

    /** Check if the editor is focused. */
    isFocused(): boolean {
        return this.editor.isFocused;
    }

    /** Check if the editor is empty. */
    isEmpty(): boolean {
        return this.editor.isEmpty;
    }

    /** Check if the editor is editable. */
    isEditable(): boolean {
        return this.editor.isEditable;
    }

    /** Destroy the editor and clean up all resources. */
    destroy(): void {
        this.themeManager.unmount();
        this.editor.destroy();
    }
}
