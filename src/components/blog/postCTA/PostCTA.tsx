import PopUpButton from "@/components/pop-up-button";
import Image from "next/image";
import React from "react";
import plan from "../../../../public/assets/images/static/plan.png";

function PostCTA() {
  return (
    <div className="-mt-[70px] flex w-auto items-center rounded bg-brand-500 p-[10px] sm:p-5 md:p-[25px] lg:p-[30px]">
      <div className="grid w-full grid-cols-1 items-center gap-4 sm:grid-cols-12 sm:justify-between">
        <div className="flex justify-center sm:col-span-3 md:col-span-2">
          <div className="flex h-[9vh] min-h-[75px] min-w-[75px] max-h-[90px] max-w-[90px] w-[9vh] items-center justify-center rounded-full bg-white">
            <Image
              src={plan.src}
              width={plan.width}
              height={plan.height}
              alt="plan"
              quality={100}
              className="mt-[10px] h-[60px] w-[50px] object-contain"
            />
          </div>
        </div>
        <div className="flex justify-center sm:col-span-6 md:col-span-7">
          <p className="ms-[10px] text-center font-heading text-stat-number-mobile sm:text-stat-number-tablet md:text-start lg:text-stat-number text-white">
            Admissions are Open for the Next Year Batch
          </p>
        </div>
        <div className="flex justify-center sm:col-span-3 md:col-span-3">
          <PopUpButton
            text="Enroll Now!"
            href="popup"
            className="px-[25px] py-[1.5vh] md:px-[22px] md:py-[2vh] lg:px-[25px]"
            style={{
              boxShadow: "1px 15px 34px 0px rgba(0, 0, 0, 0.2)",
              backgroundColor: "white",
              borderRadius: "10px",
              letterSpacing: "-0.02em",
              lineHeight: "23px",
              color: "#009BF5",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PostCTA;
