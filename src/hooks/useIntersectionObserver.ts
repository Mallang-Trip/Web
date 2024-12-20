import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends Element>(threshold = 0.5) => {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      setIsIntersecting(entries[0].isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: threshold,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return [ref, isIntersecting] as const;
};
