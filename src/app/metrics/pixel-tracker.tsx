"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Extend Window interface to include Facebook Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

export default function FbPixelPageView() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname]);
  return null;
}
