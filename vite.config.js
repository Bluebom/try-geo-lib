import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'GeoChartJs',
            formats: ['iife'],
            fileName: (format) => `geochartjs.${format}.js`,
        },
        rollupOptions: {
            output: {
                preserveModules: false,
                dir: 'dist',
                exports: 'named',
                sourcemap: true,
                globals: {
                    'chart.js': 'Chart',
                },
            }
        }
    }
});
