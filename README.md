# Sexuality Spectrum v2

- [Repository](https://github.com/bybrooklyn/spectrum)

SvelteKit + Vite + Bun port with 11 spectrum axes, 5-point labels,
and a hexagon overview chart.

## Local copy

    make install
    make run      # bun run dev (http://localhost:5173)

    make build    # bun run build
    make preview  # bun run preview (PORT=3000 bun ./build/index.js)
    make test     # bun test
    make check    # svelte-check
    make smoke    # bun scripts/smoke.ts (against a running server)

Share-code format is v2 and breaking: short base62 codes like `/0YDLrRF`
(11 axis values packed the same way as the original site's 4-char codes,
`0` = unset). Old v1 4-char codes 404 by design.

The locale param is omitted when it carries no information: English shares
are bare `/{code}`, other locales append `?l=pl` etc.

Legacy `?sfw=1` result links are still honored (NSFW axes render as unset),
but there is no SFW toggle in the UI anymore.

All slider state lives in the URL. No accounts, no tracking, no cookies.

## Copyright

 * **Author:** bybrooklyn [(github.com/bybrooklyn/spectrum)](https://github.com/bybrooklyn/spectrum)
 * **License:** [OQL](https://oql.avris.it/license?c=Andrea%20Vos%7Chttps://avris.it)
