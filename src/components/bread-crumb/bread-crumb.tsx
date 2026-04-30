"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { leagueSpartan } from "@/app/fonts";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const filteredSegments = pathSegments.filter((segment, index) => {
    return !(
      pathSegments[index - 1] === "blog" &&
      (segment === "tag" || segment === "category")
    );
  });

  const breadcrumbItems: BreadcrumbItem[] = filteredSegments.map((segment, index) => {
    const href = "/" + filteredSegments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return { label, href };
  });

  return (
    <nav className="flex items-center justify-center gap-x-6 rounded-lg bg-[#eaf6ff] p-2.5">
      <a href="/" className="no-underline">
        <p className={`${leagueSpartan.className} font-heading text-body text-ink-900 hover:underline`}>
          Home
        </p>
      </a>
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex cursor-pointer items-center justify-center gap-x-4 text-ink-900">
          <p className="mx-1.5 text-[#999]">&gt;</p>
          {index === breadcrumbItems.length - 1 ? (
            <p
              className={`${leagueSpartan.className} font-heading text-body font-medium text-[#007bff]`}
            >
              {item.label}
            </p>
          ) : (
            <a href={`${item.href}`} className="no-underline">
              <p className={`${leagueSpartan.className} font-heading text-body text-ink-900 hover:underline`}>
                {item.label}
              </p>
            </a>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
