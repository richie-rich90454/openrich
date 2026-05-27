import { Schema, type Node as ProseMirrorNode } from "prosemirror-model";
import { serializeHTML } from "./serialization/to-html";

// ---------------------------------------------------------------------------
// Default schema for parsing raw ProseMirror JSON without a TipTap editor.
// ---------------------------------------------------------------------------
// Covers the standard nodes/marks that ProseMirror's "basic" schema provides,
// with toDOM specs so DOMSerializer can render them in SSR.
// ---------------------------------------------------------------------------

const DEFAULT_SCHEMA = new Schema({
    nodes: {
        doc: { content: "block+" },
        paragraph: {
            content: "inline*",
            group: "block",
            parseDOM: [{ tag: "p" }],
            toDOM: () => ["p", 0],
        },
        heading: {
            content: "inline*",
            group: "block",
            attrs: { level: { default: 1 } },
            parseDOM: [
                { tag: "h1", attrs: { level: 1 } },
                { tag: "h2", attrs: { level: 2 } },
                { tag: "h3", attrs: { level: 3 } },
                { tag: "h4", attrs: { level: 4 } },
                { tag: "h5", attrs: { level: 5 } },
                { tag: "h6", attrs: { level: 6 } },
            ],
            toDOM: (node: ProseMirrorNode) => [`h${node.attrs.level as number}`, 0] as const,
        },
        blockquote: {
            content: "block+",
            group: "block",
            parseDOM: [{ tag: "blockquote" }],
            toDOM: () => ["blockquote", 0],
        },
        code_block: {
            content: "text*",
            group: "block",
            code: true,
            parseDOM: [{ tag: "pre", preserveWhitespace: "full" as const }],
            toDOM: () => ["pre", ["code", 0]],
        },
        horizontal_rule: {
            group: "block",
            parseDOM: [{ tag: "hr" }],
            toDOM: () => ["hr"],
        },
        ordered_list: {
            content: "list_item+",
            group: "block",
            attrs: { order: { default: 1 } },
            parseDOM: [{ tag: "ol" }],
            toDOM: (node: ProseMirrorNode) => {
                const order = node.attrs.order as number;
                return order === 1 ? (["ol", 0] as const) : (["ol", { start: order }, 0] as const);
            },
        },
        bullet_list: {
            content: "list_item+",
            group: "block",
            parseDOM: [{ tag: "ul" }],
            toDOM: () => ["ul", 0],
        },
        list_item: {
            content: "paragraph block*",
            parseDOM: [{ tag: "li" }],
            toDOM: () => ["li", 0],
        },
        text: {
            group: "inline",
        },
        hard_break: {
            inline: true,
            group: "inline",
            parseDOM: [{ tag: "br" }],
            toDOM: () => ["br"],
        },
        image: {
            inline: true,
            group: "inline",
            attrs: {
                src: {},
                alt: { default: null },
                title: { default: null },
            },
            parseDOM: [
                {
                    tag: "img[src]",
                    getAttrs: (dom: unknown) => ({
                        src: (dom as any).getAttribute("src"),
                        alt: (dom as any).getAttribute("alt"),
                        title: (dom as any).getAttribute("title"),
                    }),
                },
            ],
            toDOM: (node: ProseMirrorNode) => {
                const src = node.attrs.src as string;
                const alt = node.attrs.alt as string | null;
                const title = node.attrs.title as string | null;
                const attrs: Record<string, string> = { src };
                if (alt) attrs.alt = alt;
                if (title) attrs.title = title;
                return ["img", attrs];
            },
        },
    },
    marks: {
        strong: {
            parseDOM: [{ tag: "strong" }, { tag: "b", getAttrs: () => null }],
            toDOM: () => ["strong", 0],
        },
        em: {
            parseDOM: [{ tag: "em" }, { tag: "i", getAttrs: () => null }],
            toDOM: () => ["em", 0],
        },
        code: {
            parseDOM: [{ tag: "code" }],
            toDOM: () => ["code", 0],
        },
        link: {
            attrs: { href: {}, title: { default: null } },
            inclusive: false,
            parseDOM: [
                {
                    tag: "a[href]",
                    getAttrs: (dom: unknown) => ({
                        href: (dom as any).getAttribute("href"),
                        title: (dom as any).getAttribute("title"),
                    }),
                },
            ],
            toDOM: (mark: any) => {
                const href = mark.attrs.href as string;
                const title = mark.attrs.title as string | null;
                const attrs: Record<string, string> = { href };
                if (title) attrs.title = title;
                return ["a", attrs, 0];
            },
        },
    },
});

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Render editor content into a static HTML string suitable for SSR.
 *
 * **HTML input** – wraps the string in a `<div>` with the
 * `data-openrich-editor` attribute so the client can hydrate.
 *
 * **JSON input** – parses the ProseMirror-document JSON into a `Node` using
 * the default schema (covers paragraph, heading, blockquote, codeBlock,
 * bulletList, orderedList, listItem, hardBreak, image) and serialises via
 * {@link serializeHTML}.
 *
 * The `options.extensions` parameter is reserved for future use to support
 * TipTap extension schemas.
 *
 * @param content – HTML string *or* ProseMirror JSON document.
 * @param options – Currently unused; reserved for extension schema support.
 */
export function renderStatic(
    content: string | Record<string, any>,
    _options?: { extensions?: any[] },
): string {
    // 1. Plain HTML — wrap for hydration
    if (typeof content === "string") {
        return `<div data-openrich-editor="true">${content}</div>`;
    }

    // 2. ProseMirror JSON — parse then serialise
    const node = DEFAULT_SCHEMA.nodeFromJSON(content);
    const innerHtml = serializeHTML(node);
    return `<div data-openrich-editor="true">${innerHtml}</div>`;
}
