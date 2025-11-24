# 📦 @eightmay/hooks

A **lightweight collection of React hooks** published under the `@eightmay` namespace. This package serves as an **aggregator**, allowing you to import multiple hooks from a single package.

---

## 🌟 Features

- **Convenient Aggregation**: Import all hooks from one place.
- **Modular Design**: Each hook is also available as an independent NPM package.
- **Flexibility**: Install only the hooks you need.

---

## 🚀 Installation

Install the aggregator package:

```bash
# Using npm
npm install @eightmay/hooks

# Using yarn
yarn add @eightmay/hooks

# Using pnpm
pnpm add @eightmay/hooks
```

> **Note**: You must install the individual hook packages as dependencies. For example, if you want to use `useInfiniteScroll`, install `@eightmay/use-infinite-scroll` as well.

---

## 📘 Usage

Here’s how to use hooks from the aggregator:

```tsx
import { useInfiniteScroll } from "@eightmay/hooks";
import { useRef } from "react";
import { usePost } from "@/context";

import FeedDropdown from "../components/FeedDropdown";
import FeedList from "../components/FeedList";

const THRESHOLD = 80;

export default function Feed() {
  const { posts, status, fetchInfinite, dropdown, setDropdown } = usePost();
  const scrollRef = useRef(null);

  const onBottomReach = async () => {
    if (!fetchInfinite.hasNextPage || fetchInfinite.isFetchingNextPage) return;
    return fetchInfinite.fetchNextPage();
  };

  useInfiniteScroll({
    scrollRef,
    threshold: THRESHOLD,
    onReach: onBottomReach,
  });

  return (
    <div
      ref={scrollRef}
      className="feed flex flex-col overflow-y-scroll rounded-lg"
    >
      <FeedDropdown dropdown={dropdown} setDropdown={setDropdown} />

      <FeedList
        posts={posts}
        dropdown={dropdown}
        setDropdown={setDropdown}
        isFetchingNextPage={fetchInfinite.isFetchingNextPage}
      />
    </div>
  );
}
```

---

## 📦 Currently Available Hooks

### 1. `useInfiniteScroll`

**Package**: `@eightmay/use-infinite-scroll`  
**Description**: A hook for implementing infinite scrolling in your React applications.

#### Installation

```bash
pnpm add @eightmay/use-infinite-scroll
```

#### Usage

```tsx
import { useInfiniteScroll } from "@eightmay/hooks";
import { useRef } from "react";

function App() {
  const scrollRef = useRef(null);

  const onBottomReach = async () => {
    // Logic to fetch more data
  };

  useInfiniteScroll({
    scrollRef,
    threshold: 80,
    onReach: onBottomReach,
  });

  return (
    <div ref={scrollRef} className="scroll-container">
      {/* Render content */}
    </div>
  );
}
```

---

## 📖 Notes

- Each hook is independently published under the `@eightmay` namespace.
- The aggregator package simplifies imports but requires you to install the individual hook packages.
- Follow semantic versioning for all updates.

---

<!-- ## 🛠️ Contributing

Contributions are welcome! If you’d like to add a new hook:

1. Create a new hook package.
2. Add it to the aggregator package.
3. Update the documentation.

For more details, refer to the [Eightmay Monorepo README](../../README.md). -->
## 🏁 License

MIT © Eightmay