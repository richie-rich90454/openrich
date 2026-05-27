import { describe, it, expect } from "vitest";
import { I18nManager } from "./index";
import type { LocaleConfig } from "../types";

// Import all locale files to verify they are importable
import en from "./locales/en";
import zh from "./locales/zh";
import es from "./locales/es";
import ar from "./locales/ar";
import pt from "./locales/pt";
import fr from "./locales/fr";
import ru from "./locales/ru";
import de from "./locales/de";
import ja from "./locales/ja";
import ko from "./locales/ko";
import hi from "./locales/hi";

describe("I18nManager", () => {
    describe("constructor with string locale", () => {
        it('creates with "en" locale — dir is "ltr"', () => {
            const i18n = new I18nManager("en");
            expect(i18n.getDir()).toBe("ltr");
            expect(i18n.getLocale()).toBe("en");
        });

        it('creates with "ar" locale — dir is "rtl"', () => {
            const i18n = new I18nManager("ar");
            expect(i18n.getDir()).toBe("rtl");
            expect(i18n.getLocale()).toBe("ar");
        });

        it('creates with "he" locale — dir is "rtl"', () => {
            const i18n = new I18nManager("he");
            expect(i18n.getDir()).toBe("rtl");
        });

        it('creates with "fa" locale — dir is "rtl"', () => {
            const i18n = new I18nManager("fa");
            expect(i18n.getDir()).toBe("rtl");
        });

        it('creates with "ur" locale — dir is "rtl"', () => {
            const i18n = new I18nManager("ur");
            expect(i18n.getDir()).toBe("rtl");
        });

        it('creates with "zh" locale — dir is "ltr"', () => {
            const i18n = new I18nManager("zh");
            expect(i18n.getDir()).toBe("ltr");
            expect(i18n.getLocale()).toBe("zh");
        });

        it('creates default locale ("en") when no locale is passed', () => {
            const i18n = new I18nManager();
            expect(i18n.getLocale()).toBe("en");
            expect(i18n.getDir()).toBe("ltr");
        });

        it('falls back to "en" for unsupported locale strings', () => {
            const i18n = new I18nManager("zz");
            // Locale stays as provided, but messages fall back to en
            expect(i18n.getLocale()).toBe("zz");
            expect(i18n.getDir()).toBe("ltr");
        });
    });

    describe("constructor with LocaleConfig object", () => {
        it("creates with full LocaleConfig object", () => {
            const config: LocaleConfig = {
                dir: "rtl",
                messages: { "editor.placeholder": "اكتب هنا..." },
            };
            const i18n = new I18nManager(config);
            expect(i18n.getDir()).toBe("rtl");
            expect(i18n.getLocale()).toBe("custom");
        });

        it("creates with LocaleConfig that has ltr direction", () => {
            const config: LocaleConfig = {
                dir: "ltr",
                messages: { greeting: "hello" },
            };
            const i18n = new I18nManager(config);
            expect(i18n.getDir()).toBe("ltr");
        });

        it("uses custom messages from LocaleConfig", () => {
            const config: LocaleConfig = {
                dir: "ltr",
                messages: { customKey: "custom value" },
            };
            const i18n = new I18nManager(config);
            expect(i18n.get("customKey")).toBe("custom value");
        });
    });

    describe("getDir()", () => {
        it('returns "ltr" for English locale', () => {
            const i18n = new I18nManager("en");
            expect(i18n.getDir()).toBe("ltr");
        });

        it('returns "rtl" for Arabic locale', () => {
            const i18n = new I18nManager("ar");
            expect(i18n.getDir()).toBe("rtl");
        });
    });

    describe("get()", () => {
        it('returns message for a known key with "en" locale', () => {
            const i18n = new I18nManager("en");
            expect(i18n.get("editor.placeholder")).toBe("Type here...");
            expect(i18n.get("editor.bold")).toBe("Bold");
            expect(i18n.get("editor.italic")).toBe("Italic");
        });

        it('returns message for a known key with "ar" locale', () => {
            const i18n = new I18nManager("ar");
            expect(i18n.get("editor.placeholder")).toBe("اكتب هنا...");
            expect(i18n.get("editor.bold")).toBe("عريض");
        });

        it('returns message for a known key with "zh" locale', () => {
            const i18n = new I18nManager("zh");
            expect(i18n.get("editor.bold")).toBeDefined();
        });

        it("returns the key name for an unknown key", () => {
            const i18n = new I18nManager("en");
            expect(i18n.get("nonexistent.key")).toBe("nonexistent.key");
        });

        it("returns the key name when messages object is empty", () => {
            const i18n = new I18nManager({
                dir: "ltr",
                messages: {},
            });
            expect(i18n.get("anything")).toBe("anything");
        });
    });

    describe("all 11 locale files are importable", () => {
        const localeFiles = { en, zh, es, ar, pt, fr, ru, de, ja, ko, hi };
        const expectedKeys = [
            "editor.placeholder",
            "editor.bold",
            "editor.italic",
            "editor.underline",
            "editor.strike",
            "editor.heading",
            "editor.bulletList",
            "editor.orderedList",
            "editor.code",
            "editor.link",
            "editor.image",
            "editor.undo",
            "editor.redo",
        ];

        it("all 11 locales are imported", () => {
            expect(Object.keys(localeFiles)).toHaveLength(11);
        });

        it.each(["en", "zh", "es", "ar", "pt", "fr", "ru", "de", "ja", "ko", "hi"] as const)(
            'locale "%s" has all expected keys',
            (locale) => {
                const messages = localeFiles[locale];
                expect(messages).toBeDefined();
                for (const key of expectedKeys) {
                    expect(messages).toHaveProperty(key);
                    expect(typeof messages[key]).toBe("string");
                    expect(messages[key]!.length).toBeGreaterThan(0);
                }
            },
        );

        it("each locale has unique translated values", () => {
            const enMessages = localeFiles.en;
            const nonEnLocales = [
                "zh",
                "es",
                "ar",
                "pt",
                "fr",
                "ru",
                "de",
                "ja",
                "ko",
                "hi",
            ] as const;
            for (const locale of nonEnLocales) {
                const messages = localeFiles[locale];
                // At least one key differs from English
                const differs = expectedKeys.some((key) => messages[key] !== enMessages[key]);
                expect(differs).toBe(true);
            }
        });
    });

    describe("edge cases", () => {
        it("handles undefined locale gracefully", () => {
            const i18n = new I18nManager(undefined);
            expect(i18n.getLocale()).toBe("en");
            expect(i18n.getDir()).toBe("ltr");
        });

        it("handles empty string locale", () => {
            const i18n = new I18nManager("");
            // detectDir('') slice(0,2) = '' - not in RTL set
            expect(i18n.getDir()).toBe("ltr");
        });
    });
});
