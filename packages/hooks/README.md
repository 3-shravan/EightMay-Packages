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

```tsx
import { useInfiniteScroll, useSmoothScroll } from "@eightmay/hooks";
//more hooks like this...
```
# Here’s how to use hooks from the aggregator:

### 1. `useInfiniteScroll`

```bash
npm i @eightmay/use-infinite-scroll
```

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

### 2. `useSmoothScroll`

```bash
npm i @eightmay/use-custom-lenis
```

**Description**: A hook for enabling smooth scrolling behavior using Lenis. It provides a reference to attach to a scrollable container.

#### Usage

```tsx
import { useSmoothScroll } from "@eightmay/use-custom-lenis";

export default function Container({ children }) {
  const lenisRef = useSmoothScroll(".scroll");

  return (
    <div className="flex h-full flex-1">
      <div
        ref={lenisRef}
        className="scroll flex flex-1 flex-col items-center gap-6 overflow-y-scroll px-3.5 py-6 pb-30 md:gap-10 md:px-8 md:py-4 lg:px-15 lg:py-6"
      >
        {children}
      </div>
    </div>
  );
}
```

---

### 3. `useIgnoreLenisScroll`

```bash
npm i @eightmay/use-custom-lenis
```

**Description**: A hook for temporarily disabling Lenis scrolling on a specific container. Useful for scenarios like modals or dropdowns where you want to ignore Lenis scroll behavior.

#### Usage

```tsx
import { useIgnoreLenisScroll } from "@eightmay/use-custom-lenis";
import { AnimatePresence } from "framer-motion";
import { SearchedUser } from "./SearchedUser";

export const SearchResults = ({ users, loading, isOpen }) => {
  useIgnoreLenisScroll(".scroll");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="scroll absolute z-50 mt-4 max-h-[390px] w-full overflow-y-auto bg-background p-1 font-Futura md:w-1/2">
          {loading ? (
            <p className="m-1 px-5 py-2 font-Poppins text-second text-xs">
              Searching...
            </p>
          ) : (
            users.map((user) => <SearchedUser key={user._id} user={user} />)
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## 📦 Currently Available Hooks

### 1. `useInfiniteScroll`

**Package**: `@eightmay/use-infinite-scroll`  
**Description**: A hook for implementing infinite scrolling in your React applications.

### 2. `useSmoothScroll`

**Package**: `@eightmay/use-custom-lenis`  
**Description**: A hook for enabling smooth scrolling behavior using Lenis.

### 3. `useIgnoreLenisScroll`

**Package**: `@eightmay/use-custom-lenis`  
**Description**: A hook for temporarily disabling Lenis scrolling on specific containers.

---

## 📖 Notes

- Each hook is independently published under the `@eightmay` namespace.
- The aggregator package simplifies imports but requires you to install the individual hook packages.
- Follow semantic versioning for all updates.

---

## 🏁 License

MIT © Eightmay
