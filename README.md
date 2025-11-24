# Eightmay Monorepo

A monorepo for managing and publishing reusable hooks and packages under the `@eightmay` namespace.

---

## Prerequisites

### Install pnpm (if not installed yet)

Check if `pnpm` is installed:

```bash
pnpm -v
```

If not installed, install it globally:

```bash
npm install -g pnpm
```

---

## Getting Started

### Install All Dependencies (Root Workspace)

Install all dependencies for the monorepo:

```bash
pnpm install
```

### Build All Packages

Build every package in the monorepo:

```bash
pnpm build
```

This will build all packages under the `@eightmay` namespace.

---

## Testing Locally Before Publishing

### Option A — Test Using Workspace

Add the package directly from the workspace:

```bash
pnpm add ../eightmay/packages/use-infinite-scroll
```

Use it in your code:

```typescript
import { useInfiniteScroll } from "@eightmay/use-infinite-scroll";
```

### Option B — Pack and Install

1. Navigate to the package directory:
   ```bash
   cd packages/use-infinite-scroll
   ```
2. Create a tarball:
   ```bash
   pnpm pack
   ```
3. Install the tarball:
   ```bash
   pnpm add /full/path/to/eightmay-use-infinite-scroll-1.0.0.tgz
   ```

---

## Publishing Packages

### Publish a Single Package

1. Log in to npm:
   ```bash
   npm login
   ```
2. Navigate to the package directory:
   ```bash
   cd packages/use-infinite-scroll
   ```
3. Publish the package:
   ```bash
   npm publish --access public
   ```

Install the published package:

```bash
pnpm add @eightmay/use-infinite-scroll
```

### Publish the Aggregator Package (`@eightmay/hooks`)

1. Navigate to the aggregator package directory:
   ```bash
   cd packages/hooks
   ```
2. Publish the aggregator:
   ```bash
   npm publish --access public
   ```

Use the aggregator in your code:

```typescript
import { useInfiniteScroll } from "@eightmay/hooks";
```

---

## Adding New Hooks

1. Create a new hook package:
   ```bash
   pnpm new
   ```
2. Update the `package.json` of the new package:
   ```json
   {
     "name": "@eightmay/use-debounce"
   }
   ```
3. Build the new package:
   ```bash
   pnpm --filter @eightmay/use-debounce build
   ```
4. Publish the new package:
   ```bash
   cd packages/use-debounce
   npm publish --access public
   ```

### Add the New Hook to the Aggregator

1. Export the new hook in the aggregator:
   ```typescript
   export { useDebounce } from "@eightmay/use-debounce";
   ```
2. Rebuild and publish the aggregator:
   ```bash
   pnpm --filter @eightmay/hooks build
   npm publish --access public
   ```

---

## Notes

- Always test your packages locally before publishing.
- Follow semantic versioning for all package updates.
- Keep the aggregator package up-to-date with all new hooks.
