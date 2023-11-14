import { useEffect, useState } from "react";

const useIntersectionObserver = (ref, threshold = 0.5) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observerCallback = (entries) => {
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

  return isIntersecting;
};

export default useIntersectionObserver;
