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

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = pathSegments.map(
    (segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");

      const label = segment
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

      return { label, href };
    }
  );

  return (
    <nav className={styles.breadcrumb}>
      {/* <span className={styles.breadcrumbItem}> */}
      <Link href={`/`}>
        <Typography
          variant="body2"
          component={"p"}
          className={`${leagueSpartan.className} ${styles.link}`}
        >
          Home
        </Typography>
      </Link>

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
            <Link href={`${item.href}`}>
              <Typography
                variant="body2"
                component={"p"}
                className={`${leagueSpartan.className} `}
              >
                {item.label}
              </Typography>
            </Link>
            // <Typography
            //   onClick={() => redirectToExternal(item.href)}
            //   variant="body2"
            //   component={"p"}
            //   className={`${leagueSpartan.className} `}
            // >
            //   {item.label}
            // </Typography>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
