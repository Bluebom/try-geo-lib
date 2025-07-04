import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      
      name: 'LeafletGeo',
      
      fileName: (format) => `leafletgeo-lib.${format}.js`,
      
      formats: ['umd'] 
    },
    rollupOptions: {
        output: {
            assetFileNames: 'leafletgeo-lib.css',
        }
    }
  }
});