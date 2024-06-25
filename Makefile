install:
	pnpm install

run: install
	pnpm run dev

deploy: install
	pnpm run build
