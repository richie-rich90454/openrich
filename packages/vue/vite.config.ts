import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "OpenRichVue",
            formats: ["es", "cjs"],
            fileName: (format) => {
                if (format === "es") return "index.mjs";
                return "index.cjs";
            },
        },
        rollupOptions: {
            external: [/@openrich\//, "vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
        target: "es2015",
        sourcemap: true,
        minify: false,
    },
});
