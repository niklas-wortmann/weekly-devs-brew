import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://weeklybrew.dev',
  integrations: [
    tailwind(),
    react(),
    vue(),
    sitemap({
      filter: (page) => !page.includes('/podcast/guest')
    })
  ],
  output: 'static',
  adapter: vercel(),
  viewTransitions: true
});
