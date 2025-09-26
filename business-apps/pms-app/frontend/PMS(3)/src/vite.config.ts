import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/styles': path.resolve(__dirname, './styles'),
    },
  },
  envDir: '.', // Look for .env files in the root directory
  envPrefix: 'VITE_', // Only expose variables prefixed with VITE_
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          charts: ['recharts'],
          utils: ['axios', 'zustand'],
        },
      },
    },
  },
  define: {
    global: 'globalThis',
    // Fallback environment variables for build-time
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || 'http://localhost:3001/api'),
    'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.VITE_APP_ENV || 'development'),
    'import.meta.env.VITE_ENABLE_MOCK_API': JSON.stringify(process.env.VITE_ENABLE_MOCK_API || 'true'),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios', 'zustand'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})