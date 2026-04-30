import React from "react";
import ArHeader from "../../../components/header";

import ArServerFooter from "../../../components/ar-server-footer";
import LearnTogeather from "../../../components/contact/learn-togeather";
import GetInTouch from "../../../components/contact/get-in-touch/GetInTouch";
import Info from "../../../components/contact/info";
import { Metadata } from "next";
import { SITE_URL } from "@/utils/env";

export const metadata: Metadata = {
  title: "تواصل مع دعم تيوشنال لاستفساراتك",
  description: `تواصل مع تيوشنال للحصول على الدعم الأكاديمي والحصول على إجابات لجميع استفساراتك. لا تتردد، نحن على بعد نقرة واحدة فقط.`,
  alternates: {
    canonical: `${SITE_URL}/ar/contact`,
  },
};

const ArContact: React.FC = () => {
  return (
    <div dir="rtl">
      <ArHeader heroClassName="h-[100px] sm:h-[100px] md:h-[200px] lg:h-[200px] bg-[#D7F0FF]" />
      <div className="bg-[#D7F0FF]">
        <div className="mx-auto pt-[120px] sm:pt-[150px] md:pt-[200px] lg:max-w-[1450px] lg:pt-[210px]">
          <LearnTogeather />
        </div>
      </div>
      <GetInTouch />
      <div className="mx-auto mb-[3vh] mt-[5vh] lg:max-w-[1450px]">
        <Info />
      </div>
      <ArServerFooter />
    </div>
  );
};

export default ArContact;
