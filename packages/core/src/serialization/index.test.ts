import { describe, it, expect } from "vitest";

describe("serialization barrel exports", () => {
    it("exports serializeHTML", async () => {
        const mod = await import("./index");
        expect(mod.serializeHTML).toBeDefined();
        expect(typeof mod.serializeHTML).toBe("function");
    });

    it("exports serializeJSON", async () => {
        const mod = await import("./index");
        expect(mod.serializeJSON).toBeDefined();
        expect(typeof mod.serializeJSON).toBe("function");
    });

    it("exports serializeText", async () => {
        const mod = await import("./index");
        expect(mod.serializeText).toBeDefined();
        expect(typeof mod.serializeText).toBe("function");
    });

    it("exports serializeMarkdown", async () => {
        const mod = await import("./index");
        expect(mod.serializeMarkdown).toBeDefined();
        expect(typeof mod.serializeMarkdown).toBe("function");
    });

    it("exports serializeDoc", async () => {
        const mod = await import("./index");
        expect(mod.serializeDoc).toBeDefined();
        expect(typeof mod.serializeDoc).toBe("function");
    });

    it("exports renderStatic", async () => {
        const mod = await import("./index");
        expect(mod.renderStatic).toBeDefined();
        expect(typeof mod.renderStatic).toBe("function");
    });

    it("serializeDoc returns a SerializedDoc object", async () => {
        const mod = await import("./index");
        expect(mod.serializeDoc).toBeDefined();
        expect(typeof mod.serializeDoc).toBe("function");
    });
});
