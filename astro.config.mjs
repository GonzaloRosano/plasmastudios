// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: update once plasmastudios has a real domain
  site: 'http://169.58.226.205',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});