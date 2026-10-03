# Spectrum

Where are you on the Gender & Sexuality Spectrum?

- [Repository](https://github.com/bybrooklyn/spectrum)

Move the sliders, share the link. All state lives in the URL —
no accounts, no tracking, no cookies.

## Local copy

    just install   # bun install
    just run       # dev server
    just test      # unit tests
    just check     # typecheck
    just build     # production build
    just serve     # production server with gzip
    just preview   # vite preview
    bun scripts/smoke.ts http://localhost:3000       # smoke a running server
    SMOKE_GZIP=1 bun scripts/smoke.ts http://localhost:3000  # incl. gzip check

## Deploy (Cloudflare Workers → spectrum.bybrooklyn.dev)

    just deploy   # ADAPTER=cloudflare build + wrangler deploy

Every push to `main` deploys via GitHub Actions (needs a
`CLOUDFLARE_API_TOKEN` repo secret). Compression, caching, and edge
come from Cloudflare; `server.ts` is local-only.

## Share links

Short base62 codes like `/0YDLrRF` (11 sliders packed 0–9, `0` = unset).
English links carry no locale param; other locales append `?l=pl` etc.
Unknown locales fall back to English. Old 4-char codes 404.

## Copyright

 * **Author:** bybrooklyn [(github.com/bybrooklyn/spectrum)](https://github.com/bybrooklyn/spectrum)
 * **License:** [OQL](https://oql.avris.it/license?c=Andrea%20Vos%7Chttps://avris.it)
