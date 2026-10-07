import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { execSync } from 'node:child_process';
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

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
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
