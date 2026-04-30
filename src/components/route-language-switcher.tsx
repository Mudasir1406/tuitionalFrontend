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
    <div className={cn("flex items-center", !fullWidth && "lg:mx-3")}>
      <Button
        onClick={handleLanguageSwitch}
        variant="outline"
        className={cn(
          "rounded-md whitespace-nowrap",
          fullWidth && "w-full",
          isArabic && "font-arabic",
        )}
      >
        {isArabic ? "English" : "عربي"}
      </Button>
    </div>
  );
};

export default RouteLanguageSwitcher;
