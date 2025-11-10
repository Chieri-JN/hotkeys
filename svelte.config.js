// import adapter from '@sveltejs/adapter-static';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
//
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	// Consult https://svelte.dev/docs/kit/integrations
// 	// for more information about preprocessors
// 	preprocess: vitePreprocess(),
//
// 	kit: {
// 		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
// 		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
// 		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
// 		// adapter: adapter()
// 		adapter: adapter({
// 			fallback: 'index.html'
// 		})
// 	}
// };
//
// export default config;

// import adapter from '@sveltejs/adapter-static';
//
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		adapter: adapter({ fallback: '404.html' }),
// 		paths: {
// 			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
// 		},
// 	},
// };
//
// export default config;

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const dev = process.argv.includes('dev');
const repoName = 'hotkeys'; // 👈 replace with your repo name

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: dev ? '' : `/${repoName}`
		},
		prerender: {
			handleHttpError: 'warn' // avoids breaking if some routes fail prerender
		}
	},
	preprocess: vitePreprocess()
};

export default config;
