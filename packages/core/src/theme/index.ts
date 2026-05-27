import type { ThemeMode } from "../types";
import { isClient } from "../utils/is-client";

export class ThemeManager {
    private theme: ThemeMode;
    private mediaQuery: MediaQueryList | null = null;
    private mediaListener: ((this: MediaQueryList, ev: MediaQueryListEvent) => void) | null = null;

    constructor(initial: ThemeMode = "system") {
        this.theme = initial;
    }

    private getPrefersDark(): boolean {
        if (!isClient) return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    private startMediaListener(): void {
        if (!isClient || this.mediaQuery) return;

        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        this.mediaListener = (e: MediaQueryListEvent) => {
            if (this.theme === "system") {
                this.applyTheme(e.matches ? "dark" : "light");
            }
        };
        this.mediaQuery.addEventListener("change", this.mediaListener);
    }

    private stopMediaListener(): void {
        if (this.mediaQuery && this.mediaListener) {
            this.mediaQuery.removeEventListener("change", this.mediaListener);
        }
        this.mediaQuery = null;
        this.mediaListener = null;
    }

    private applyTheme(resolved: "light" | "dark"): void {
        if (!isClient) return;

        if (resolved === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    setTheme(mode: ThemeMode): void {
        this.theme = mode;

        if (mode === "system") {
            this.startMediaListener();
            this.applyTheme(this.getPrefersDark() ? "dark" : "light");
        } else {
            this.stopMediaListener();
            this.applyTheme(mode);
        }
    }

    getCurrentTheme(): ThemeMode {
        return this.theme;
    }

    getResolvedTheme(): "light" | "dark" {
        if (this.theme === "system") {
            return this.getPrefersDark() ? "dark" : "light";
        }
        return this.theme;
    }

    mount(): void {
        if (this.theme === "system") {
            this.startMediaListener();
        }
        this.applyTheme(this.getResolvedTheme());
    }

    unmount(): void {
        this.stopMediaListener();
    }
}
