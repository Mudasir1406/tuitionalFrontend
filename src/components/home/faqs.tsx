import * as React from "react";
import Image from "next/image";

import { Faqs_Type, getFaqs } from "../../services/faqs/faqs";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import Questions from "./questions";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";

interface Props {
  locale?: "en" | "ar";
}

const Faqs: React.FC<Props> = async ({ locale = "en" }) => {
  const faqs: Faqs_Type[] = await getFaqs();
  const t = locale === "ar" ? ar.home.faqs : en.home.faqs;

  return (
    <div className="relative mb-5 flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center bg-transparent">
        <h2 className="relative mb-5 flex items-center justify-center text-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-black">
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -left-[6%] -top-5 h-[19px] w-5 object-contain sm:hidden"
          />
          <Image
            src={linesInvert}
            alt=""
            aria-hidden="true"
            className="absolute -left-[6%] -top-[35px] hidden h-[35px] w-[43px] object-contain sm:block"
          />
          {t.heading}
        </h2>
      </div>
      <div className="w-full">
        {faqs?.map((item, index) => (
          <Questions key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default Faqs;
