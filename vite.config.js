import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { caseStudyRoutes } from './src/case-study-routes.js';

const hosting = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
const previewHeaders = Object.fromEntries(hosting.headers.find(rule => rule.source === '/(.*)').headers.map(({key, value}) => [key, value]));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'mpa',
  input: [
    resolve(import.meta.dirname, 'index.html'),
    ...Object.values(caseStudyRoutes).map(route => resolve(import.meta.dirname, `.${route}index.html`)),
  ],
  build: { sourcemap: false },
  preview: { headers: previewHeaders },
});
