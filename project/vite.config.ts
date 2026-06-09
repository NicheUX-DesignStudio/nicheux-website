import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3010,
    host: true,
    // ✅ PROXY API REQUESTS TO BACKEND
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      }
    },
    // ✅ WATCH FOR CHANGES IN PUBLIC FOLDER
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
    // ✅ CORS HEADERS FOR DEVELOPMENT
    cors: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          const extType = name.split('.').pop()?.toLowerCase() || '';
          
          if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp', 'avif'].includes(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(extType)) {
            return `assets/videos/[name]-[hash][extname]`;
          }
          if (['woff', 'woff2', 'ttf', 'eot', 'otf'].includes(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
