import { describe, it, expect, beforeEach } from "vitest";
import { ThemeManager } from "./index";

describe("ThemeManager", () => {
    beforeEach(() => {
        // Clean up any dark class left by previous tests
        document.documentElement.classList.remove("dark");
    });

    describe("constructor", () => {
        it('creates with "light" theme', () => {
            const tm = new ThemeManager("light");
            expect(tm.getCurrentTheme()).toBe("light");
        });

        it('creates with "dark" theme', () => {
            const tm = new ThemeManager("dark");
            expect(tm.getCurrentTheme()).toBe("dark");
        });

        it('creates with "system" theme', () => {
            const tm = new ThemeManager("system");
            expect(tm.getCurrentTheme()).toBe("system");
        });

        it('defaults to "system" when no theme is provided', () => {
            const tm = new ThemeManager();
            expect(tm.getCurrentTheme()).toBe("system");
        });
    });

    describe("setTheme()", () => {
        it("changes current theme from light to dark", () => {
            const tm = new ThemeManager("light");
            tm.setTheme("dark");
            expect(tm.getCurrentTheme()).toBe("dark");
        });

        it("changes current theme from dark to light", () => {
            const tm = new ThemeManager("dark");
            tm.setTheme("light");
            expect(tm.getCurrentTheme()).toBe("light");
        });

        it("changes current theme from light to system", () => {
            const tm = new ThemeManager("light");
            tm.setTheme("system");
            expect(tm.getCurrentTheme()).toBe("system");
        });

        it('applies "dark" class to document when set to dark', () => {
            const tm = new ThemeManager("light");
            tm.setTheme("dark");
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });

        it('removes "dark" class from document when set to light', () => {
            const tm = new ThemeManager("dark");
            tm.setTheme("light");
            expect(document.documentElement.classList.contains("dark")).toBe(false);
        });
    });

    describe("getCurrentTheme()", () => {
        it('returns "light" immediately after construction with light', () => {
            const tm = new ThemeManager("light");
            expect(tm.getCurrentTheme()).toBe("light");
        });

        it('returns "dark" after setTheme dark', () => {
            const tm = new ThemeManager("light");
            tm.setTheme("dark");
            expect(tm.getCurrentTheme()).toBe("dark");
        });

        it('returns "system" after setTheme system', () => {
            const tm = new ThemeManager("dark");
            tm.setTheme("system");
            expect(tm.getCurrentTheme()).toBe("system");
        });
    });

    describe("mount()", () => {
        it("applies theme class on mount", () => {
            const tm = new ThemeManager("dark");
            tm.mount();
            expect(document.documentElement.classList.contains("dark")).toBe(true);
        });

        it("applies light theme class on mount when theme is light", () => {
            const tm = new ThemeManager("light");
            tm.mount();
            expect(document.documentElement.classList.contains("dark")).toBe(false);
        });
    });

    describe("unmount()", () => {
        it("unmount does not throw", () => {
            const tm = new ThemeManager("light");
            expect(() => tm.unmount()).not.toThrow();
        });
    });

    describe("getResolvedTheme()", () => {
        it('returns "light" when theme is light', () => {
            const tm = new ThemeManager("light");
            expect(tm.getResolvedTheme()).toBe("light");
        });

        it('returns "dark" when theme is dark', () => {
            const tm = new ThemeManager("dark");
            expect(tm.getResolvedTheme()).toBe("dark");
        });

        it("returns a resolved value when theme is system", () => {
            const tm = new ThemeManager("system");
            const resolved = tm.getResolvedTheme();
            expect(["light", "dark"]).toContain(resolved);
        });
    });
});
