import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Define Vite configuration
export default defineConfig({
  base: '/inventorymanagement/', // Ensure this is set correctly
  plugins: [react()],
  resolve: {
    alias: {
      // Map '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global : 'window',
    // global: {
    //   basename: '/inventorymanagement/',
    //   // 'window',
    // },
  },
});