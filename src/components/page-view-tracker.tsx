"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { hashSHA256 } from "@/utils/helper";

type IProps = {};
const PageViewTracker: React.FC<IProps> = () => {
  const pathname = usePathname();
  const handlePageView = async (path: string) => {
    const emailHashed = await hashSHA256("mudasir1406@gmail.com");
    await fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "PageView",
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: emailHashed,
          client_ip_address: "254.254.254.254",
          client_user_agent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0",
        },
        custom_data: { page_path: path },
      }),
    });
  };
  useEffect(() => {
    handlePageView(pathname);
  }, [pathname]);

  return null;
};
export default PageViewTracker;
