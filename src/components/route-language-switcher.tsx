"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface RouteLanguageSwitcherProps {
  fullWidth?: boolean;
}

const RouteLanguageSwitcher: React.FC<RouteLanguageSwitcherProps> = ({ fullWidth }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isArabic = pathname.startsWith("/ar");

  const handleLanguageSwitch = () => {
    if (isArabic) {
      const englishPath = pathname.replace("/ar", "") || "/";
      router.push(englishPath);
    } else {
      router.push(`/ar${pathname}`);
    }
  };

  return (
    <div className={cn("flex items-center", !fullWidth && "mx-2 lg:mx-3")}>
      <Button
        onClick={handleLanguageSwitch}
        variant="outline"
        className={cn(
          "rounded font-heading font-bold whitespace-nowrap min-w-fit transition-none",
          // Baseline metrics: 1.5vh fontSize, 1.84vh lh, 1.2vh py, 1.5vw px
          !fullWidth && "px-[1.5vw] py-[1.2vh] text-[1.5vh] leading-[1.84vh] h-auto",
          // Drawer (fullWidth) override: 1.1rem text, 1.2vh py, full width
          fullWidth && "w-full h-auto py-[1.2vh] text-[1.1rem] leading-[1.84vh]",
          isArabic && "font-arabic",
        )}
      >
        {isArabic ? "English" : "عربي"}
      </Button>
    </div>
  );
};

export default RouteLanguageSwitcher;
