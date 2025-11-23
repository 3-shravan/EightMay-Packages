import React, { useEffect, useRef } from "react";

export interface UseInfiniteScrollProps {
  scrollRef: React.RefObject<HTMLElement>;
  threshold?: number;
  onReach: () => Promise<void> | void;
}

export function useInfiniteScroll({
  scrollRef,
  threshold = 80,
  onReach,
}: UseInfiniteScrollProps) {
  const lockRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const remaining = scrollHeight - (scrollTop + clientHeight);

      if (remaining < threshold && !lockRef.current) {
        lockRef.current = true;
        Promise.resolve(onReach?.()).finally(() => {
          setTimeout(() => {
            lockRef.current = false;
          }, 150);
        });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollRef, threshold, onReach]);

  return { lockRef };
}
