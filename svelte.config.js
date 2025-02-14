import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      replace: [['__DATE__', new Date().toISOString()]]
    })
  ]
};

export default config;
