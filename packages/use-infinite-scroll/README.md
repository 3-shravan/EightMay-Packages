# 📦 use-infinite-scroll

A lightweight and dependency-free **React infinite scroll hook** that triggers a callback when the user scrolls near the bottom of a container. Perfect for feeds, timelines, infinite lists, dashboards, and lazy-loaded content.

---

## 🚀 Installation

```sh
npm install @eightmay/use-infinite-scroll
# or
yarn add @eightmay/use-infinite-scroll
```

---

## ⭐ Why use `@eightmay/use-infinite-scroll`?

- Zero dependencies — extremely lightweight
- Works in any scrollable container (not window only)
- Prevents multiple triggers with built-in lock
- Promise friendly — works with async loaders
- Fully typed (TypeScript)
- Perfect for feeds, infinite lists
- Simple 3-property API

---

## 📘 Usage (How to Implement)

```tsx
import { useRef } from "react";
import useInfiniteScroll from "use-infinite-scroll";

export default function Feed() {
  const scrollRef = useRef(null);

  const loadMore = async () => {
    // fetch next page or more items
  };

  useInfiniteScroll({
    scrollRef,
    threshold: 80,
    onReach: loadMore,
  });

  return (
    <div ref={scrollRef} className="overflow-y-scroll h-[600px]">
      {/* feed items */}
    </div>
  );
}
```

---

## ⚙️ API Reference

### `useInfiniteScroll(options)`

| Option    | Type                           | Default  | Description                           |
| --------- | ------------------------------ | -------- | ------------------------------------- |
| scrollRef | `React.RefObject<HTMLElement>` | required | Scroll container reference            |
| threshold | `number`                       | 80       | Trigger when within X px from bottom  |
| onReach   | `() => Promise<void> \| void`  | —        | Callback fired when bottom is reached |

---

## 🏁 License

MIT © Shravan
