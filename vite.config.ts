import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// Converts the Vite-injected render-blocking stylesheet link to a preload pattern.
// Runs post-build so the hashed filename is always correct.
const cssPreloadPlugin = (): Plugin => ({
  name: 'css-preload',
  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
      `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
      `\n<noscript><link rel="stylesheet" href="$1"></noscript>`
    )
  },
})

export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: './src/pages' }),
    react(),
    tailwindcss(),
    cssPreloadPlugin(),
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
