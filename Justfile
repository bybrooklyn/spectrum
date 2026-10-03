install:
	bun install

run: install
	bun run dev

build: install
	bun run build

preview: build
	bun run preview

check: install
	bun run check

test: install
	bun test
