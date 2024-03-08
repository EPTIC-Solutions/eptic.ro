import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import autoprefixer from "autoprefixer";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/main.ts"],
            refresh: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
    },
});
