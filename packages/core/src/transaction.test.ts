import { describe, it, expect } from "vitest";

describe("transaction exports", () => {
    it("exports createChain as a function", async () => {
        const mod = await import("./transaction");
        expect(mod.createChain).toBeDefined();
        expect(typeof mod.createChain).toBe("function");
    });
});
