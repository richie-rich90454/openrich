import { describe, it, expect } from "vitest";
import { renderStatic } from "./render-static";

describe("renderStatic", () => {
    describe("HTML string input", () => {
        it("returns HTML containing the input", () => {
            const result = renderStatic("<p>hello</p>");
            expect(result).toContain("<p>hello</p>");
        });

        it("adds data-openrich-editor attribute", () => {
            const result = renderStatic("<p>hello</p>");
            expect(result).toContain('data-openrich-editor="true"');
        });

        it("wraps content in a div", () => {
            const result = renderStatic("<p>hello</p>");
            expect(result).toMatch(/^<div\s/);
            expect(result).toMatch(/<\/div>$/);
        });

        it("handles empty string", () => {
            const result = renderStatic("");
            expect(result).toBe('<div data-openrich-editor="true"></div>');
        });

        it("handles complex HTML content", () => {
            const html = "<h1>Title</h1><p>Some <strong>bold</strong> text</p>";
            const result = renderStatic(html);
            expect(result).toContain("<h1>Title</h1>");
            expect(result).toContain("<strong>bold</strong>");
        });

        it("handles HTML with special characters", () => {
            const html = "<p>AT&T</p>";
            const result = renderStatic(html);
            // The HTML is embedded directly; &amp; would only appear if we double-escape
            expect(result).toContain("<p>AT&T</p>");
        });
    });

    describe("JSON document input", () => {
        it("serializes a simple JSON document to HTML", () => {
            const json = {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "hello" }],
                    },
                ],
            };
            const result = renderStatic(json);
            expect(result).toContain('data-openrich-editor="true"');
            expect(result).toContain("<p>hello</p>");
        });

        it("handles JSON with heading", () => {
            const json = {
                type: "doc",
                content: [
                    {
                        type: "heading",
                        attrs: { level: 2 },
                        content: [{ type: "text", text: "Title" }],
                    },
                ],
            };
            const result = renderStatic(json);
            expect(result).toContain("<h2>Title</h2>");
        });

        it("handles JSON with bold mark", () => {
            const json = {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [
                            { type: "text", text: "hello ", marks: [] },
                            { type: "text", text: "world", marks: [{ type: "strong" }] },
                        ],
                    },
                ],
            };
            const result = renderStatic(json);
            expect(result).toContain("<strong>world</strong>");
        });

        it("handles JSON with multiple blocks", () => {
            const json = {
                type: "doc",
                content: [
                    { type: "paragraph", content: [{ type: "text", text: "first" }] },
                    { type: "paragraph", content: [{ type: "text", text: "second" }] },
                ],
            };
            const result = renderStatic(json);
            expect(result).toContain("<p>first</p>");
            expect(result).toContain("<p>second</p>");
        });
    });

    describe("edge cases", () => {
        it("preserves data-openrich-editor attribute wrapping", () => {
            const result = renderStatic("<p>test</p>");
            // Must exactly match the attribute format used in the source
            expect(result).toBe('<div data-openrich-editor="true"><p>test</p></div>');
        });
    });
});
