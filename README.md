# Eightmay Monorepo Commands

## Install pnpm (if not installed yet)

Check:
```
pnpm -v
```

If not installed:
```
npm install -g pnpm
```

## Install ALL dependencies (root workspace)
```
pnpm install
```

## Build all packages
```
pnpm build
```

This builds:
- @eightmay/use-infinite-scroll
- @eightmay/utils
- @eightmay/hooks

## Test Locally BEFORE Publishing

### Option A — Test using workspace
```
pnpm add ../eightmay-monorepo/packages/use-infinite-scroll
```

Use it:
```ts
import { useInfiniteScroll } from "@eightmay/use-infinite-scroll";
```

### Option B — Pack and install
```
cd packages/use-infinite-scroll
pnpm pack
```

Install the tarball:
```
pnpm add /full/path/to/eightmay-use-infinite-scroll-1.0.0.tgz
```

## Publish Your First Package
```
npm login
cd packages/use-infinite-scroll
npm publish --access public
```

Install it:
```
pnpm add @eightmay/use-infinite-scroll
```

## Publish Aggregator @eightmay/hooks
```
cd packages/hooks
npm publish --access public
```

Use it:
```ts
import { useInfiniteScroll } from "@eightmay/hooks";
```

## Adding New Hooks

Duplicate:
```
packages/use-infinite-scroll → packages/use-debounce
```

Update package.json:
```json
"name": "@eightmay/use-debounce"
```

Build:
```
pnpm --filter @eightmay/use-debounce build
```

Publish:
```
cd packages/use-debounce
npm publish --access public
```

Add to aggregator:
```
export { useDebounce } from "@eightmay/use-debounce";
```

Rebuild aggregator:
```
pnpm --filter @eightmay/hooks build
npm publish --access public
```
