import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { dirname, resolve, extname, relative } from 'node:path';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts(), libInjectCss()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'ui-kit',
            formats: ['es'],
            fileName: 'ui-kit',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            // output: {
            //     globals: {
            //         react: 'React',
            //         'react-dom': 'ReactDOM',
            //         'react/jsx-runtime': 'react/jsx-runtime',
            //     },
            // },
            input: Object.fromEntries(
                glob
                    .sync('src/**/*.{ts,tsx}')
                    .map((file) => [
                        relative(
                            'src',
                            file.slice(0, file.length - extname(file).length)
                        ),
                        fileURLToPath(new URL(file, import.meta.url)),
                    ])
            ),
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            },
        },
    },
});
