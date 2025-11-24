# 📦 @eightmay/use-infinite-scroll

A lightweight and dependency-free **React infinite scroll hook** that triggers a callback when the user scrolls near the bottom of a container. Ideal for feeds, timelines, infinite lists, dashboards, and lazy-loaded content.

---

## 🌟 Features

- **Zero Dependencies**: Extremely lightweight.
- **Container-Based**: Works with any scrollable container.
- **Built-In Lock**: Prevents multiple triggers.
- **Promise-Friendly**: Supports async loaders.
- **TypeScript Support**: Fully typed API.
- **Simple API**: Easy to integrate.

---

## 🚀 Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install @eightmay/use-infinite-scroll

# Using yarn
yarn add @eightmay/use-infinite-scroll

# Using pnpm
pnpm add @eightmay/use-infinite-scroll
```

---

## 📘 Usage Example

Here’s how to use `useInfiniteScroll` in a React component:

```tsx
import { useRef } from "react";
import { useInfiniteScroll } from "@eightmay/use-infinite-scroll";

export default function Feed() {
  const scrollRef = useRef(null);

  const loadMore = async () => {
    // Fetch the next page or more items
    console.log("Loading more items...");
  };

  useInfiniteScroll({
    scrollRef,
    threshold: 80, // Trigger when 80px from the bottom
    onReach: loadMore,
  });

  return (
    <div ref={scrollRef} className="overflow-y-scroll h-[600px] border rounded">
      {/* Render feed items here */}
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </div>
  );
}
```

---

## ⚙️ API Reference

### `useInfiniteScroll(options)`

| Option      | Type                           | Default      | Description                                                   |
| ----------- | ------------------------------ | ------------ | ------------------------------------------------------------- |
| `scrollRef` | `React.RefObject<HTMLElement>` | **Required** | Reference to the scrollable container.                        |
| `threshold` | `number`                       | `80`         | Distance (in pixels) from the bottom to trigger the callback. |
| `onReach`   | `() => Promise<void> \| void`  | **Required** | Callback fired when the bottom is reached.                    |

---

## 🛠️ Example with Async Loader

```tsx
import { useInfiniteScroll } from "@eightmay/use-infinite-scroll"
import { useRef, useState } from "react"

export default function InfiniteFeed() {
  const scrollRef = useRef(null)
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`))
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = async () => {
    if (isLoading) return
    setIsLoading(true)

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setItems((prev) => [
      ...prev,
      ...Array.from({ length: 10 }, (_, i) => `Item ${prev.length + i + 1}`),
    ])

    setIsLoading(false)
  }

  useInfiniteScroll({
    scrollRef,
    threshold: 100,
    onReach: loadMore,
  })

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-scroll rounded-xl border-1 border-gray-700 p-4"
    >
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      {isLoading && <p>Loading more...</p>}
    </div>
  )
}
```

---

## 📖 Notes

- **Scroll Container**: Ensure the `scrollRef` points to a scrollable container with `overflow-y: scroll`.
- **Threshold**: Adjust the `threshold` value based on your UI requirements.
- **Lock Mechanism**: The hook prevents multiple triggers while the `onReach` callback is running.

---

## 🏁 License

MIT © Eightmay
