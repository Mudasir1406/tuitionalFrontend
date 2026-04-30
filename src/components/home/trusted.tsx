import React from "react";
import Image, { type StaticImageData } from "next/image";
import "swiper/css";

import {
  Trusted_Schools_Type,
  getTrustedSchools,
} from "../../services/trusted-schools/trusted-schools";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import linesInvert from "../../../public/assets/images/static/lines-invert.png";
import linesMobile from "../../../public/assets/images/static/linesMobile.png";

interface Props {
  locale?: "en" | "ar";
}

const Trusted: React.FC<Props> = async ({ locale = "en" }) => {
  const trustedSchools: Trusted_Schools_Type = await getTrustedSchools();
  const t = locale === "ar" ? ar.home.trusted : en.home.trusted;

  return (
    <div className="-z-[2] flex h-full w-screen flex-col items-center justify-center bg-gradient-to-b from-[#D3EFFE] to-white/70">
      <h2 className="relative mt-[7vh] text-center font-heading text-h2-mobile sm:mt-[8vh] sm:text-h2-tablet md:mt-[9.5vh] lg:mt-[10.5vh] lg:text-h2 px-[2vw] sm:px-0 text-black">
        <Image
          src={linesMobile}
          alt=""
          aria-hidden="true"
          className="absolute -top-[2vh] left-[2vw] z-10 h-[100px] w-[100px] object-contain sm:hidden"
        />
        <Image
          src={linesInvert}
          alt=""
          aria-hidden="true"
          className="absolute z-10 hidden h-[100px] w-[100px] object-contain sm:-left-[3.5vw] sm:-top-[3vh] sm:block md:-left-[3vw] md:-top-[3vh] lg:-left-[35px] lg:-top-10"
        />
        {t.heading}
      </h2>

      <div className="relative mt-[5vh] w-full overflow-hidden">
        <div className="flex animate-[slide_20s_linear_infinite] whitespace-nowrap">
          {trustedSchools?.images.map((item, index) => (
            <div key={index} className="ms-[10px] bg-transparent">
              <ImageBox imageSource={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;

interface ImageBoxProps {
  imageSource: StaticImageData | string;
}

const ImageBox: React.FC<ImageBoxProps> = ({ imageSource }) => (
  <div className="schoolsBox flex h-[107px] w-[177px] max-h-[190px] items-center justify-center rounded-md bg-white lg:h-[40vh] lg:w-[349px]">
    <Image src={imageSource} width={80} height={80} alt="" />
  </div>
);
