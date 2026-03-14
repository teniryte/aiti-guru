/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { fileURLToPath, URL } from 'node:url';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      svgr(),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number(env.PORT) || 5173,
      allowedHosts: ['flaux.ru'],
    },
    test: {
      environment: 'happy-dom',
      include: ['src/**/*.test.{ts,tsx}'],
      globals: false,
    },
  };
});
