import { describe, it, expect, vi } from "vitest";

// Mock the Solid-specific modules to avoid needing a Solid JSX transform.
vi.mock("./editor", () => ({ OpenRichEditor: {} }));
vi.mock("./create-editor", () => ({ createEditor: {} }));

import * as exports from "./index";

describe("@openrich/solid", () => {
    it("exports OpenRichEditor", () => {
        expect(exports.OpenRichEditor).toBeDefined();
    });

    it("exports createEditor", () => {
        expect(exports.createEditor).toBeDefined();
    });
});
