import nodeAdapter from '@sveltejs/adapter-node';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';

// Local dev/build/serve/smoke stay on the Node adapter.
// Cloudflare deploys set ADAPTER=cloudflare.
const useCloudflare = process.env.ADAPTER === 'cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: useCloudflare ? cloudflareAdapter() : nodeAdapter(),
		alias: {
			$lib: './src/lib'
		}
	}
};

export default config;