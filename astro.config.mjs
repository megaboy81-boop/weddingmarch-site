import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://megaboy81-boop.github.io',
  integrations: [tailwind()],
  // Vercel 배포 시 server 설정 제거 (정적 빌드)
  output: 'static',
});
