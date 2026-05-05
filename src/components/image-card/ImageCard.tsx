import Image from "next/image";
import { CardProps } from "../grade-subject-level/tutor-section/TutorSection";
import { leagueSpartan } from "@/app/fonts";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";
import { useState } from "react";
import Tag from "../tag/Tag";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import PopUpButton from "../pop-up-button";
import dynamic from "next/dynamic";

const TutorModal = dynamic(() => import("../home/tutor-modal"), { ssr: false });

interface props {
  data: CardProps;
  locale?: string;
}

const ImageCard = ({ data, locale = "en" }: props) => {
  const [tutorModal, setTutorModal] = useState(false);

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(56,182,255,0.25),0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(56,182,255,0.35),0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl bg-[#eaf6ff]">
        <Image
          src={data?.profileImageUrl ? data?.profileImageUrl : dummyImg}
          alt={`${data?.["First Name"]}'s profile`}
          fill
          sizes="(min-width:1200px) 25vw, (min-width:600px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <h3
          onClick={() => setTutorModal(true)}
          className={`${leagueSpartan.className} cursor-pointer font-heading text-xl font-bold leading-tight text-ink-900 sm:text-[1.375rem]`}
        >
          {`${data?.["First Name"]} ${data?.["Last Name"] ?? ""}`.trim()}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {data?.Subjects?.map((tag, index) => (
            <Tag key={`s-${index}`} label={tag} index={index} isClickable={false} />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {data?.Curiculum?.map((tag, index) => (
            <Tag key={`c-${index}`} label={tag} index={index} isClickable={false} />
          ))}
        </div>

        <div
          className={`${leagueSpartan.className} line-clamp-2 font-heading text-sm leading-snug text-gray-600`}
          dangerouslySetInnerHTML={{ __html: data?.Description ?? "" }}
        />

        <div className="mt-1 flex items-center gap-2">
          <Image src={greenstars} alt="rating stars" width={120} height={24} className="h-6 w-auto" />
          <span className={`${leagueSpartan.className} font-heading text-sm font-medium text-ink-900`}>
            {data?.["Success rate"]}%
          </span>
        </div>

        <PopUpButton
          text={locale === "ar" ? "احجز حصة تجريبية" : "Book A Demo"}
          href="popup"
          className="mt-auto w-full rounded-[10px] bg-brand-500 px-4 py-3 text-center font-heading text-sm font-semibold text-white shadow-[0_15px_34px_-8px_rgba(56,182,255,0.5)] transition-transform duration-300 ease-out hover:scale-[1.02] hover:bg-brand-500 sm:py-3.5 sm:text-base"
        />

        {tutorModal && (
          <TutorModal
            handleClose={() => setTutorModal(false)}
            open={tutorModal}
            data={data}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
};

export default ImageCard;
