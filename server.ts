/**
 * Production server: SvelteKit SSR + static files + gzip compression.
 * Usage: bun run build && (PORT=3000 bun server.ts &)
 *
 * adapter-node's own index.js serves without compression (Lighthouse:
 * "No compression applied"), so this wrapper drives SvelteKit's Server
 * directly under Bun.serve and gzips text responses. Revalidates with:
 * bun scripts/smoke.ts http://localhost:3000
 */
// Generated build output ships without types.
// @ts-ignore
import { Server } from './build/server/index.js';
// @ts-ignore
import { manifest } from './build/server/manifest.js';

const port = Number(process.env.PORT ?? 3000);

const COMPRESSIBLE = /^(text\/|application\/(javascript|json|.*\+xml)|image\/svg\+xml)/;
const MIN_BYTES = 1024;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const server: any = new Server(manifest);
await server.init({ env: process.env });

async function gzipped(res: Response, req: Request): Promise<Response> {
  const encoding = req.headers.get('accept-encoding') ?? '';
  const type = res.headers.get('content-type') ?? '';
  if (!res.body || res.headers.get('content-encoding') || !COMPRESSIBLE.test(type) || !encoding.includes('gzip')) {
    return res;
  }
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.byteLength < MIN_BYTES) return res;
  const gz = Bun.gzipSync(buf);
  const headers = new Headers(res.headers);
  headers.set('content-encoding', 'gzip');
  headers.set('content-length', String(gz.length));
  return new Response(gz, { status: res.status, statusText: res.statusText, headers });
}

async function serveStatic(pathname: string, req: Request): Promise<Response | null> {
  if (pathname.includes('..')) return null;
  try {
    const decoded = decodeURIComponent(pathname);
    if (decoded !== pathname && decoded.includes('..')) return null;
  } catch {
    return null;
  }
  const file = Bun.file(`./build/client${pathname}`);
  if (!(await file.exists())) return null;
  const type = file.type || 'application/octet-stream';
  const headers = new Headers({ 'content-type': type });
  if (pathname.startsWith('/_app/immutable/')) {
    headers.set('cache-control', 'public,max-age=31536000,immutable');
  }
  const encoding = req.headers.get('accept-encoding') ?? '';
  if (encoding.includes('gzip') && COMPRESSIBLE.test(type) && file.size > MIN_BYTES) {
    const gz = Bun.gzipSync(new Uint8Array(await file.arrayBuffer()));
    headers.set('content-encoding', 'gzip');
    headers.set('content-length', String(gz.length));
    return new Response(gz, { headers });
  }
  return new Response(file, { headers });
}

Bun.serve({
  port,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const staticRes = await serveStatic(url.pathname, req);
    if (staticRes) return staticRes;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: Response = await (server as any).respond(req, {
      getClientAddress: () => '127.0.0.1'
    });
    return gzipped(res, req);
  }
});

console.log(`listening on ${port} (gzip on)`);
