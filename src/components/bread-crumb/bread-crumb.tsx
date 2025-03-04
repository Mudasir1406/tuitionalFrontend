"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";
import { Typography } from "@mui/material";
import { redirectToExternal } from "@/utils/helper";
import { leagueSpartan } from "@/app/fonts";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  // Filter out "tag" or "category" if they appear right after "blog"
  const filteredSegments = pathSegments.filter((segment, index) => {
    return !(
      pathSegments[index - 1] === "blog" &&
      (segment === "tag" || segment === "category")
    );
  });

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = filteredSegments.map(
    (segment, index) => {
      const href = "/" + filteredSegments.slice(0, index + 1).join("/");

      const label = segment
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

      return { label, href };
    }
  );

  return (
    <nav className={styles.breadcrumb}>
      {/* <span className={styles.breadcrumbItem}> */}
      <a href={`/`}>
        <Typography
          variant="body2"
          component={"p"}
          className={`${leagueSpartan.className} ${styles.link}`}
        >
          Home
        </Typography>
      </a>

      {/* </span> */}
      {breadcrumbItems.map((item, index) => (
        <div key={index} className={styles.breadcrumbItem}>
          <Typography className={styles.separator}> &gt; </Typography>
          {index === breadcrumbItems.length - 1 ? (
            <Typography
              variant="body2"
              className={`${leagueSpartan.className} ${styles.link} ${styles.active} `}
              component={"p"}
            >
              {item.label}
            </Typography>
          ) : (
            <a href={`${item.href}`}>
              <Typography
                variant="body2"
                component={"p"}
                className={`${leagueSpartan.className} `}
              >
                {item.label}
              </Typography>
            </a>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
