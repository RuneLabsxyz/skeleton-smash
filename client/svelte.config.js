import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    adapter: adapter(),
	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
			$src: 'src',
			$stores: 'src/stores',
			$dojo: 'src/dojo',
		}
	},
	preprocess: vitePreprocess(),
};

export default config;
