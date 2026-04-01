import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://megaboy81-boop.github.io',
  base: '/weddingmarch-site',
  integrations: [tailwind()],
  output: 'static',
});
