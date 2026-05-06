import React from "react";
import Image from "next/image";

import {
  getTrustedSchools,
  Trusted_Schools_Type,
} from "@/services/trusted-schools/trusted-schools";

async function SchoolLogosSection() {
  const trustedSchools: Trusted_Schools_Type = await getTrustedSchools();
  return (
    <div className="flex overflow-hidden bg-gradient-to-r from-white to-[#58b9f6] p-[1vh]">
      <div className="flex animate-[slide_50s_linear_infinite] flex-row items-center justify-start gap-12 whitespace-nowrap">
        {trustedSchools?.images.map((logo, i) => (
          <Image
            key={i}
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-auto object-contain"
          />
        ))}
        {trustedSchools?.images.map((logo, i) => (
          <Image
            key={`duplicate-${i}`}
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
}

export default SchoolLogosSection;
