import { describe, it, expect } from "vitest";
import * as extensions from "./index";

describe("@openrich/extensions", () => {
    // Individual spot-check exports
    it("exports Paragraph", () => {
        expect(extensions.Paragraph).toBeDefined();
    });

    it("exports Heading", () => expect(extensions.Heading).toBeDefined());
    it("exports Bold", () => expect(extensions.Bold).toBeDefined());
    it("exports Italic", () => expect(extensions.Italic).toBeDefined());
    it("exports BulletList", () => expect(extensions.BulletList).toBeDefined());

    // Test all 23 exports exist
    const expected = [
        "Paragraph",
        "Heading",
        "BulletList",
        "OrderedList",
        "TaskList",
        "TaskItem",
        "CodeBlock",
        "Blockquote",
        "HorizontalRule",
        "Image",
        "HardBreak",
        "Bold",
        "Italic",
        "Underline",
        "Strike",
        "Code",
        "Link",
        "Highlight",
        "Placeholder",
        "Document",
        "Text",
        "History",
        "ListItem",
    ];

    for (const name of expected) {
        it(`exports ${name}`, () => {
            expect(extensions[name as keyof typeof extensions]).toBeDefined();
        });
    }
});
