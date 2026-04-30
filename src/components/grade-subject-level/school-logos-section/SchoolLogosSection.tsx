import React from "react";
import Image from "next/image";

import {
  getTrustedSchools,
  Trusted_Schools_Type,
} from "@/services/trusted-schools/trusted-schools";

async function SchoolLogosSection() {
  const trustedSchools: Trusted_Schools_Type = await getTrustedSchools();
  return (
    <div className="overflow-hidden bg-white py-8">
      <div className="flex animate-[slide_25s_linear_infinite] gap-8 whitespace-nowrap">
        {trustedSchools?.images.map((logo, i) => (
          <Image
            key={i}
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="h-24 w-auto object-contain"
          />
        ))}
        {trustedSchools?.images.map((logo, i) => (
          <Image
            key={`duplicate-${i}`}
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="h-24 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
}

export default SchoolLogosSection;
