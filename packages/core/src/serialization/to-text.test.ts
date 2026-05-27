import { describe, it, expect } from "vitest";
import { Schema, DOMParser as ProseMirrorDOMParser } from "prosemirror-model";
import type { Node as ProseMirrorNode } from "prosemirror-model";
import { serializeText } from "./to-text";

const testSchema = new Schema({
    nodes: {
        doc: { content: "block+" },
        paragraph: {
            content: "inline*",
            group: "block",
            parseDOM: [{ tag: "p" }],
            toDOM: () => ["p", 0],
        },
        text: { group: "inline" },
    },
});

function createDoc(html: string): ProseMirrorNode {
    const dom = new globalThis.DOMParser().parseFromString(html, "text/html");
    return ProseMirrorDOMParser.fromSchema(testSchema).parse(dom);
}

describe("serializeText", () => {
    it("extracts text from a single paragraph", () => {
        const doc = createDoc("<p>hello</p>");
        expect(serializeText(doc)).toBe("hello");
    });

    it("extracts text from multiple paragraphs separated by newline", () => {
        const doc = createDoc("<p>first</p><p>second</p>");
        expect(serializeText(doc)).toBe("first\nsecond");
    });

    it("handles an empty paragraph", () => {
        const doc = createDoc("<p></p>");
        expect(serializeText(doc)).toBe("");
    });

    it("handles mixed content with nested inline text", () => {
        const doc = createDoc("<p>Hello <strong>world</strong></p>");
        // The strong mark wraps text, so the text content is "Hello world"
        expect(serializeText(doc)).toBe("Hello world");
    });

    it("returns empty string for an empty document", () => {
        // Create a minimal empty doc - just doc node itself (with no content)
        const doc = testSchema.nodeFromJSON({ type: "doc", content: [] });
        expect(serializeText(doc)).toBe("");
    });

    it("handles many paragraphs", () => {
        const doc = createDoc("<p>a</p><p>b</p><p>c</p>");
        expect(serializeText(doc)).toBe("a\nb\nc");
    });

    it("throws when given invalid input", () => {
        expect(() => serializeText(null)).toThrow("serializeText");
        expect(() => serializeText(undefined)).toThrow("serializeText");
        expect(() => serializeText({})).toThrow("serializeText");
    });

    it("handles a doc-like object with state.doc (editor-like)", () => {
        const editorLike = {
            state: {
                doc: createDoc("<p>from editor</p>"),
            },
        };
        expect(serializeText(editorLike)).toBe("from editor");
    });

    it("handles a doc-like object with doc property", () => {
        const wrapper = {
            doc: createDoc("<p>wrapped</p>"),
        };
        expect(serializeText(wrapper)).toBe("wrapped");
    });
});
