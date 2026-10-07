import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

/**
 * Wayfinder shells out to `php artisan wayfinder:generate`. Hosts such as
 * Vercel build the frontend without a PHP runtime, so only register the
 * plugin when PHP is actually available on the build machine.
 */
const hasPhp = (() => {
    try {
        execSync('php --version', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
})();

const reactPlugin = () =>
    react({
        babel: {
            plugins: ['babel-plugin-react-compiler'],
        },
    });

/**
 * `vite build --mode static` produces a standalone site in `dist/` from
 * `index.html` and `resources/js/static.jsx`, with no Laravel or Inertia
 * involvement. BASE_PATH sets the public sub-path (default `/`), which
 * GitHub Pages needs when the site is served from a repository path.
 */
const staticConfig = () => {
    const base = process.env.BASE_PATH || '/';

    return {
        base,
        plugins: [reactPlugin(), tailwindcss()],
        define: {
            'import.meta.env.VITE_ASSET_BASE': JSON.stringify(base),
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
            },
        },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
        },
        esbuild: {
            jsx: 'automatic',
        },
    };
};

const laravelConfig = () => ({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        reactPlugin(),
        tailwindcss(),
        ...(hasPhp
            ? [
                  wayfinder({
                      formVariants: true,
                  }),
              ]
            : []),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});

export default defineConfig(({ mode }) => (mode === 'static' ? staticConfig() : laravelConfig()));
