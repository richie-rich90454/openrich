import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: process.env.VITE_BASE_URL || "/",
    resolve: {
        alias: {
            "@openrich/core": resolve(__dirname, "../packages/core"),
            "@openrich/react": resolve(__dirname, "../packages/react"),
            "@openrich/extensions": resolve(__dirname, "../packages/extensions"),
            "@openrich/starter-kit": resolve(__dirname, "../packages/extensions-starter-kit"),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
});
