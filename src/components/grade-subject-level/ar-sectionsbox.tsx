import React from "react";
import PopUpButton from "../pop-up-button";

const ArSectionsBox = () => (
  <div
    className="my-4 flex h-[8vh] flex-row items-center justify-center gap-[2vh] rounded-[1.5vh] bg-[#E7F6FF] px-[3vw] backdrop-blur-sm shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)] sm:px-[3vw] lg:my-0 lg:h-[12vh] lg:px-0"
    dir="rtl"
  >
    <p className="text-start font-heading text-h6 font-bold text-ink-900 lg:text-[3vh]">
      انضم إلى فصول تفاعلية مباشرة عبر الإنترنت مع مدرسينا المعتمدين!
    </p>
    <PopUpButton
      text="احجز تجربة مجانية"
      href="popup"
      className="w-1/2 rounded-[10px] py-[1vh] text-white sm:w-1/5 lg:py-[10px]"
      style={{
        boxShadow: "1px 4px 24px 0px #38B6FFB2",
        backgroundColor: "#38B6FF",
      }}
    />
  </div>
);

export default ArSectionsBox;
