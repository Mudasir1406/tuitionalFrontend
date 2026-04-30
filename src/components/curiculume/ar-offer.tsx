"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import offer1 from "../../../public/assets/images/static/offer-img-1.png";
import offer2 from "../../../public/assets/images/static/offer-img-2.png";
import offer3 from "../../../public/assets/images/static/offer-img-3.png";
import { leagueSpartan } from "@/app/fonts";

const BUTTON_CLS =
  "m-4 inline-flex w-1/2 cursor-pointer items-center justify-center rounded-[10px] bg-[#38B6FF] px-0 py-[1vh] text-[1.5vh] font-bold normal-case text-white shadow-[1px_4px_24px_0px_#38B6FFB2] transition-all duration-500 hover:scale-105 sm:w-[30%] md:m-[2vh_3vh] md:w-[30%] lg:w-[14vh]";

const COVERAGE_TEXT_CLS =
  "w-full px-[3vh] pt-[3vh] font-heading text-h6 font-semibold text-[#2D2D2D] sm:w-[70%] sm:px-[4vh] sm:pt-[4vh] lg:w-[70%] lg:px-[4vh] lg:pt-[4vh]";

const REGULAR_TEXT_CLS =
  "w-4/5 px-[1.5vh] pt-[1.5vh] font-heading text-h6 font-semibold text-[#2D2D2D] sm:w-[65%] sm:px-[1.5vh] sm:pt-[1.5vh] lg:w-[70%] lg:px-[3vh] lg:pt-[4vh]";

const SmallImageWrap = ({ src }: { src: typeof offer2 }) => (
  <div className="-mt-10 h-[15vh] w-full overflow-hidden text-end sm:h-[20vh] md:h-[25vh]">
    <Image src={src} alt="pic" className="h-full w-auto object-contain" />
  </div>
);

const ArOffer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div dir="rtl" className="px-0 sm:px-0 md:px-[2vw] lg:px-[5vw]">
      <h3
        className={`${leagueSpartan.className} text-center font-heading text-h2-mobile font-semibold leading-[6vh] sm:text-h2-tablet lg:text-h2 text-ink-900`}
      >
        ما نقدمه
      </h3>

      <div className="mx-[1.5vh] sm:mx-[1.5vh] md:mx-[2.5vh] lg:mx-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <div className="my-4 rounded-[2vh] bg-[#9EDCFF]">
              <div className="flex">
                <div>
                  <p className={`${leagueSpartan.className} ${COVERAGE_TEXT_CLS}`}>
                    تغطية شاملة لمنهج الرياضيات IGCSE
                  </p>
                  <div className="flex justify-end">
                    <button className={`${leagueSpartan.className} ${BUTTON_CLS}`}>
                      اعرف المزيد
                    </button>
                  </div>
                </div>
                <div className="h-[15vh] sm:h-[20vh] md:h-[25vh] lg:h-[25vh]">
                  <Image src={offer1} alt="pic" className="h-full w-auto" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[2vh] bg-[#9EDCFF]">
                <p className={`${leagueSpartan.className} ${REGULAR_TEXT_CLS}`}>
                  تقييمات وملاحظات منتظمة
                </p>
                <div className="flex justify-end">
                  <button className={`${leagueSpartan.className} ${BUTTON_CLS}`}>
                    اعرف المزيد
                  </button>
                </div>
                <SmallImageWrap src={offer2} />
              </div>
              <div className="rounded-[2vh] bg-[#9EDCFF]">
                <p className={`${leagueSpartan.className} ${REGULAR_TEXT_CLS}`}>
                  الوصول إلى الموارد والمواد التدريبية
                </p>
                <div className="flex justify-end">
                  <button className={`${leagueSpartan.className} ${BUTTON_CLS}`}>
                    اعرف المزيد
                  </button>
                </div>
                <SmallImageWrap src={offer3} />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div className="my-4 rounded-[2vh] bg-[#9EDCFF]">
                <p className={`${leagueSpartan.className} ${REGULAR_TEXT_CLS}`}>
                  تقييمات وملاحظات منتظمة
                </p>
                <div className="flex justify-end">
                  <button className={`${leagueSpartan.className} ${BUTTON_CLS}`}>
                    اعرف المزيد
                  </button>
                </div>
                <SmallImageWrap src={offer2} />
              </div>
              <div className="my-4 rounded-[2vh] bg-[#9EDCFF]">
                <p className={`${leagueSpartan.className} ${REGULAR_TEXT_CLS}`}>
                  الوصول إلى الموارد والمواد التدريبية
                </p>
                <div className="flex justify-end">
                  <button className={`${leagueSpartan.className} ${BUTTON_CLS}`}>
                    اعرف المزيد
                  </button>
                </div>
                <SmallImageWrap src={offer3} />
              </div>
            </div>

            <div className="rounded-[2vh] bg-[#9EDCFF]">
              <div className="flex">
                <div>
                  <p className={`${leagueSpartan.className} ${COVERAGE_TEXT_CLS}`}>
                    تغطية شاملة لمنهج الرياضيات IGCSE
                  </p>
                  <div className="flex justify-end">
                    <button className={`${leagueSpartan.className} ${BUTTON_CLS}`}>
                      اعرف المزيد
                    </button>
                  </div>
                </div>
                <div className="h-[15vh] sm:h-[20vh] md:h-[25vh] lg:h-[25vh]">
                  <Image src={offer1} alt="pic" className="h-full w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArOffer;
