import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://weeklybrew.dev',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => !page.includes('/podcast/guest')
    })
  ],
  output: 'static',
  adapter: vercel(),
  viewTransitions: true
});
