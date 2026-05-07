"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

interface LazyLoadWrapperProps {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  minHeight?: string | number;
}

export default function LazyLoadWrapper({
  children,
  placeholder,
  rootMargin = "300px",
  minHeight = "200px",
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isVisible
        ? children
        : placeholder ?? (
            <div
              style={{
                minHeight,
                backgroundColor: "transparent",
              }}
            />
          )}
    </div>
  );
}
