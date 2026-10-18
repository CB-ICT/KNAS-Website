import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        // styleguide.html is alleen voor ontwikkeling (bereikbaar via de dev-server) en gaat niet mee naar productie.
        input: { main: path.resolve(__dirname, 'index.html') },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // DISABLE_HMR=true schakelt hot reload en file watching uit (minder CPU tijdens bulkwijzigingen).
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true'
        ? null
        : { ignored: ['**/public/docs/**', '**/scripts/tmp-*'] },
    },
    preview: {
      // Voorkomt dat de lokale preview een oude build uit de browsercache toont.
      headers: { 'Cache-Control': 'no-store' },
    },
  };
});
