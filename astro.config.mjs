import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'http://ccweddingmarch.com',
  base: '/',
  integrations: [tailwind()],
  output: 'static',
});
