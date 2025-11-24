# 📦 @eightmay/hooks

A lightweight **collection of React hooks** published under the `@eightmay` scope.

This package acts as an **aggregator**, meaning:
- Each hook is published as its **own NPM package**  
- But you can also import them **conveniently from one place**  
- No need to install every hook individually

---

## 🚀 Installation

```sh
npm install @eightmay/hooks
# or
yarn add @eightmay/hooks
# or
pnpm add @eightmay/hooks
```
## 📘 Usage
```tsx
import { useInfiniteScroll, useDebounce } from "@eightmay/hooks";

function App() {
  const debounced = useDebounce(value, 300);

  return <div />;
}
```

## 📦 What this package contains
This aggregator exports all hooks inside the Eightmay ecosystem, e.g.:
- @eightmay/use-infinite-scroll
- will be more...

# Everything is automatically plugged in via your monorepo scripts.