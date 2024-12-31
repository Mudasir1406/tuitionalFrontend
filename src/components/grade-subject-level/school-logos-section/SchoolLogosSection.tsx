import React from "react";
import styles from "./SchoolLogosSection.module.css";

import Image from "next/image";
import {
  getTrustedSchools,
  Trusted_Schools_Type,
} from "@/services/trusted-schools/trusted-schools";

async function SchoolLogosSection() {
  const trustedSchools: Trusted_Schools_Type = await getTrustedSchools();
  return (
    <div className={styles.main}>
      <div className={styles.logosDiv}>
        <div className={styles.logoWrapper}>
          {trustedSchools?.images.map((logo, i) => (
            <Image
              key={i}
              src={logo}
              alt="logo"
              width={100}
              height={100}
              objectFit="contain"
            />
          ))}
          {/* Duplicate logos for a seamless sliding effect */}
          {trustedSchools?.images.map((logo, i) => (
            <Image
              key={`duplicate-${i}`}
              src={logo}
              alt="logo"
              width={100}
              height={100}
              objectFit="contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SchoolLogosSection;
