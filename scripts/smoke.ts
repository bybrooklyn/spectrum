/**
 * Smoke test against a running server (dev or preview).
 * Usage: bun run build && (PORT=4173 bun ./build/index.js &) && bun scripts/smoke.ts http://localhost:4173
 */
const base = (process.argv[2] ?? 'http://localhost:5173').replace(/\/$/, '');

let failures = 0;

async function check(name, path, wantStatus, wantBody) {
  const url = base + path;
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(`FAIL ${name}: fetch error for ${url}: ${message}`);
    failures++;
    return;
  }
  const body = await res.text();
  if (res.status !== wantStatus) {
    console.error(`FAIL ${name}: ${url} status ${res.status}, want ${wantStatus}`);
    failures++;
    return;
  }
  if (wantBody && !body.includes(wantBody)) {
    console.error(`FAIL ${name}: ${url} body missing ${JSON.stringify(wantBody)}`);
    failures++;
    return;
  }
  console.log(`ok ${name}: ${res.status} ${path}`);
}

async function checkHeader(name: string, path: string, header: string, want: RegExp) {
  const url = base + path;
  let res;
  try {
    res = await fetch(url, { headers: { 'Accept-Encoding': 'gzip' } });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(`FAIL ${name}: fetch error for ${url}: ${message}`);
    failures++;
    return;
  }
  await res.arrayBuffer();
  const value = res.headers.get(header) ?? '';
  if (res.status !== 200 || !want.test(value)) {
    console.error(`FAIL ${name}: ${url} ${header}=${JSON.stringify(value)} (want ${want})`);
    failures++;
    return;
  }
  console.log(`ok ${name}: ${header}=${value}`);
}

await check('root', '/', 200, 'Spectrum');
await check('result', '/0YDLrRF', 200, 'My Gender');
await check('privacy gone', '/privacy', 404);
await check('locale pl', '/?l=pl', 200, 'Spektrum');
await check('locale ar (rtl)', '/?l=ar', 200, 'الطيف');
await check('invalid locale falls back', '/?l=xx', 200, 'Spectrum');
await check('sfw result', '/0YDLrRF?sfw=1', 200);
await check('old v1 code 404s', '/wbWN', 404);
await check('old short code 404s', '/1234', 404);
await check('bad code 404s', '/abcdefghijk', 404);
await check('static favicon', '/favicon.png', 200);
await check('manifest', '/manifest.json', 200, 'Spectrum');
// Only the custom gzip server (bun server.ts) compresses; vite dev and
// adapter-node preview do not. Opt in with SMOKE_GZIP=1.
if (process.env.SMOKE_GZIP === '1') {
  await checkHeader('gzip html', '/', 'content-encoding', /gzip/);
}

if (failures > 0) {
  console.error(`${failures} smoke check(s) failed`);
  process.exit(1);
}
console.log('smoke: all green');
