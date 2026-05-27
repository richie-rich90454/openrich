import { describe, it, expect, vi } from "vitest";

// Mock the .svelte component so Vite doesn't need the Svelte compiler.
vi.mock("./Editor.svelte", () => ({ default: {} }));

import * as exports from "./index";

describe("@openrich/svelte", () => {
    it("exports OpenRichEditor", () => {
        expect(exports.OpenRichEditor).toBeDefined();
    });
});
