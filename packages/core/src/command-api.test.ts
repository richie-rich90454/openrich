import { describe, it, expect } from "vitest";

describe("command-api exports", () => {
    it("exports toggleBold as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleBold).toBeDefined();
        expect(typeof mod.toggleBold).toBe("function");
    });

    it("exports toggleItalic as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleItalic).toBeDefined();
        expect(typeof mod.toggleItalic).toBe("function");
    });

    it("exports toggleUnderline as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleUnderline).toBeDefined();
        expect(typeof mod.toggleUnderline).toBe("function");
    });

    it("exports toggleStrike as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleStrike).toBeDefined();
        expect(typeof mod.toggleStrike).toBe("function");
    });

    it("exports toggleHeading as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleHeading).toBeDefined();
        expect(typeof mod.toggleHeading).toBe("function");
    });

    it("exports toggleBulletList as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleBulletList).toBeDefined();
        expect(typeof mod.toggleBulletList).toBe("function");
    });

    it("exports toggleOrderedList as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleOrderedList).toBeDefined();
        expect(typeof mod.toggleOrderedList).toBe("function");
    });

    it("exports toggleBlockquote as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleBlockquote).toBeDefined();
        expect(typeof mod.toggleBlockquote).toBe("function");
    });

    it("exports toggleCodeBlock as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.toggleCodeBlock).toBeDefined();
        expect(typeof mod.toggleCodeBlock).toBe("function");
    });

    it("exports insertImage as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.insertImage).toBeDefined();
        expect(typeof mod.insertImage).toBe("function");
    });

    it("exports setLink as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.setLink).toBeDefined();
        expect(typeof mod.setLink).toBe("function");
    });

    it("exports undo as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.undo).toBeDefined();
        expect(typeof mod.undo).toBe("function");
    });

    it("exports redo as a function", async () => {
        const mod = await import("./command-api");
        expect(mod.redo).toBeDefined();
        expect(typeof mod.redo).toBe("function");
    });
});
