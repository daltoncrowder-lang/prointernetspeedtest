import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output. Cloudflare Pages serves the built /dist as static assets and
// runs everything under /functions as Pages Functions (the speed-test endpoints).
export default defineConfig({
  site: 'https://prointernetspeedtest.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
