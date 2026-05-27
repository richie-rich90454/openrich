import type { Dir, LocaleConfig } from "../types";
import messages from "./messages";

const RTL_LOCALES = new Set(["ar", "he", "fa", "ur", "ps", "yi", "sd"]);

function detectDir(locale: string): Dir {
    const lang = locale.slice(0, 2).toLowerCase();
    return RTL_LOCALES.has(lang) ? "rtl" : "ltr";
}

export class I18nManager {
    private resolvedLocale: string;
    private dir: Dir;
    private messages: Record<string, string>;

    constructor(locale?: string | LocaleConfig) {
        if (typeof locale === "object" && locale !== null) {
            this.resolvedLocale = "custom";
            this.dir = locale.dir;
            this.messages = locale.messages;
        } else {
            const raw = locale || "en";
            this.resolvedLocale = raw;
            this.dir = detectDir(raw);
            this.messages = messages[raw] || messages["en"] || {};
        }
    }

    get(key: string): string {
        return this.messages[key] || key;
    }

    getDir(): Dir {
        return this.dir;
    }

    getLocale(): string {
        return this.resolvedLocale;
    }
}
