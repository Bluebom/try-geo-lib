import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      
      name: 'LeafletGeoChart',
      
      fileName: (format) => `leafletgeochart-lib.${format}.js`,
      
      formats: ['umd'] 
    },
    rollupOptions: {
        output: {
            assetFileNames: 'leafletgeochart-lib.css',
        }
    }
  }
});