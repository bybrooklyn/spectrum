import nodeAdapter from '@sveltejs/adapter-node';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';

// Local dev/build/serve/smoke stay on the Node adapter (Bun compatible).
// Cloudflare deploys set ADAPTER=cloudflare (see Justfile deploy, CI).
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
