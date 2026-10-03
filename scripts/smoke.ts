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
    console.error(`FAIL ${name}: fetch error for ${url}: ${e.message}`);
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

await check('root', '/', 200, 'Spectrum');
await check('editor show button', '/', 200, 'Show overview');
await check('result', '/0YDLrRF', 200, 'Spectrum');
await check('result radar', '/0YDLrRF', 200, 'radar-title');
await check('privacy gone', '/privacy', 404);
await check('locale pl', '/?l=pl', 200, 'Spektrum');
await check('sfw result', '/0YDLrRF?sfw=1', 200);
await check('old v1 code 404s', '/wbWN', 404);
await check('old short code 404s', '/1234', 404);
await check('bad code 404s', '/abcdefghijk', 404);
await check('static favicon', '/favicon.png', 200);

if (failures > 0) {
  console.error(`${failures} smoke check(s) failed`);
  process.exit(1);
}
console.log('smoke: all green');
