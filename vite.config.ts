import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

const copyHtmlPlugin = () => {
  return {
    name: 'copy-html-plugin',
    closeBundle() {
      // Copy index.html to ecostep-privacy-policy.html to support clean URLs on GitHub Pages
      // without needing a trailing slash or directory redirect.
      fs.copyFileSync(
        path.resolve(__dirname, 'dist/index.html'),
        path.resolve(__dirname, 'dist/ecostep-privacy-policy.html')
      );
      console.log('Copied index.html to dist/ecostep-privacy-policy.html');
    }
  };
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), copyHtmlPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
