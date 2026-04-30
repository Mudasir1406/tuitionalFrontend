"use client";

import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";

type IconKey = "address" | "phone" | "email";

interface InfoBoxProps {
  heading: string;
  dec: string;
  icon: IconKey;
  isRTL: boolean;
}

const Info: React.FC = () => {
  const { t, isRTL } = useI18n();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <InfoBox
        heading={t("contact.info.address_heading")}
        dec={t("contact.info.address_value")}
        icon="address"
        isRTL={isRTL}
      />
      <InfoBox
        heading={t("contact.info.contact_heading")}
        dec="+971 56 490 0376"
        icon="phone"
        isRTL={isRTL}
      />
      <InfoBox
        heading={t("contact.info.email_heading")}
        dec="hello@tuitionaledu.com"
        icon="email"
        isRTL={isRTL}
      />
    </div>
  );
};

export default Info;

const InfoBox: React.FC<InfoBoxProps> = ({ heading, dec, icon, isRTL }) => {
  const Icon = icon === "email" ? Mail : icon === "phone" ? Phone : MapPin;

  return (
    <div
      className={cn(
        "relative mt-[70px] flex min-w-[340px] flex-col items-center justify-center rounded-md bg-[#F0FAFF]",
        "px-5 py-12 sm:py-[50px] md:py-[70px] lg:min-w-[420px] lg:py-[100px]",
        "shadow-[0px_-3px_8px_0px_#009BF526_inset,0px_2px_1px_0px_#0000000D]",
      )}
    >
      <div
        className={cn(
          "absolute -top-[50px] z-10 flex items-center justify-center rounded-full bg-white",
          "h-[85px] w-[85px] sm:h-[95px] sm:w-[95px] md:h-[100px] md:w-[100px] lg:h-[115px] lg:w-[115px]",
          "shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526]",
        )}
      >
        <Icon className="h-[30px] w-[35px] text-[#009BF5]" aria-hidden="true" />
      </div>
      <h3
        className={cn(
          "mb-[22px] text-center text-[35px] font-medium leading-[35px] sm:text-[30px] sm:leading-[35px] md:text-[35px] md:leading-[35px] lg:text-[35px] lg:leading-[33px]",
          isRTL ? "font-arabic" : "font-heading",
        )}
      >
        {heading}
      </h3>
      <p
        className={cn(
          "text-center text-[18px] font-normal leading-[27px] sm:text-[22px] sm:leading-[23px] md:text-[25px] md:leading-[23px] lg:text-[25px] lg:leading-[23px]",
          isRTL ? "font-arabic" : "font-heading",
        )}
      >
        {dec}
      </p>
    </div>
  );
};
