import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import linesMobileWhite from "../../../public/assets/images/static/linesMobileWhite.png";
import linesInvertWhite from "../../../public/assets/images/static/lines-invert-white.png";
import logo from "../../../public/assets/images/static/logo.png";

interface Props {
  locale?: "en" | "ar";
}

const VideoBasedReview = async ({ locale = "en" }: Props) => {
  const data = await getVideoReviews();
  const t = locale === "ar" ? ar.testimonials.video_based_reviews : en.testimonials.video_based_reviews;

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="relative mb-[50px] text-center font-heading text-[35px] font-semibold leading-[45px] sm:text-[40px] sm:leading-[50px] md:text-start md:text-[55px] md:leading-[65px] lg:text-start lg:text-[55px] lg:leading-[65px] text-black">
        <Image
          src={linesMobileWhite}
          alt=""
          aria-hidden="true"
          className="absolute -top-[15px] left-[10px] z-10 h-[12px] w-[14px] object-contain sm:hidden"
        />
        <Image
          src={linesInvertWhite}
          alt=""
          aria-hidden="true"
          className="absolute -left-[30px] -top-[50px] z-10 hidden h-[12px] w-[14px] object-contain sm:block"
        />
        {t.heading}
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="h-[327px] w-full overflow-hidden rounded-[20px] shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] sm:h-[400px] md:h-[500px] lg:h-[707px]">
            {data &&
              data
                .filter((item) => item.isSelected)
                .map((item, index) => (
                  <video
                    key={index}
                    src={item.video}
                    controls
                    poster={item.thumbnil || logo.src}
                    className="h-full w-full"
                  />
                ))}
          </div>
        </div>

        <div className="flex items-center justify-center lg:col-span-5">
          <div className="grid grid-cols-1 gap-4">
            {data &&
              data
                .filter((item) => !item.isSelected)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex h-[147px] items-center rounded-[20px] bg-white/70 p-[10px] shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000D] lg:h-[204px]"
                  >
                    <video
                      src={item.video}
                      controls
                      poster={item.thumbnil || logo.src}
                      className="h-[135px] w-[184px] rounded-md lg:h-[204px] lg:w-[283px]"
                    />
                    <div className="ms-[25px]">
                      <p className="my-[10px] font-heading text-[20px] font-semibold leading-[32px] text-black sm:text-[30px] lg:my-[20px]">
                        {item.name}
                      </p>
                      <p className="my-[10px] font-heading text-[18px] font-normal leading-[20px] text-black lg:my-[20px]">
                        {item.country}
                      </p>
                      <p className="my-[20px] flex items-center font-heading text-[18px] font-semibold leading-[20px] text-[#00A1FF]">
                        {t.watch_video} <Play size={18} className="ms-1" />
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBasedReview;
