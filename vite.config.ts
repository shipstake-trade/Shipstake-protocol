import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: './src/pages' }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'router': ['@tanstack/react-router'],
          'wallet': ['@privy-io/react-auth'],
          'solana': ['@solana/web3.js'],
          'anchor': ['@coral-xyz/anchor'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
})
