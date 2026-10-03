install:
	bun install

run: install
	bun run dev

build: install
	bun run build

preview: build
	bun run preview

serve: build
	bun server.ts

deploy:
	ADAPTER=cloudflare bun run build
	bunx wrangler deploy

check: install
	bun run check

test: install
	bun test
