import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://weeklybrew.dev',
  integrations: [tailwind(), react(), sitemap()],
  experimental: { contentLayer: true },
  output: 'static',
  adapter: vercel(),
});