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

  const maxLength = 90;

  return (
    <div className="w-full rounded-xl bg-white shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
      <div className="relative h-[250px] w-full overflow-hidden rounded-xl">
        <Image
          src={data?.profileImageUrl ? data?.profileImageUrl : dummyImg}
          alt={`${data?.["First Name"]}'s profile`}
          fill
          className="h-full w-full object-contain"
        />
      </div>
      <div className="p-4">
        <p
          className={`${leagueSpartan.className} mb-1.5 cursor-pointer font-heading text-h3 transition-transform duration-300 hover:scale-y-110`}
          onClick={() => setTutorModal(true)}
        >
          {`${data?.["First Name"]} ${data?.["Last Name"]} `}
        </p>
        <div className="mb-2 flex flex-wrap justify-start gap-x-1 gap-y-1">
          {data?.Subjects?.map((tag, index) => (
            <Tag key={index} label={tag} index={index} isClickable={false} />
          ))}
        </div>
        <div className="mb-2 flex flex-wrap justify-start gap-x-1 gap-y-1">
          {data?.Curiculum?.map((tag, index) => (
            <Tag key={index} label={tag} index={index} isClickable={false} />
          ))}
        </div>
        <p className={`${leagueSpartan.className} font-heading text-small`}>{data.university}</p>
        <div
          className={`${leagueSpartan.className} font-heading text-small`}
          dangerouslySetInnerHTML={{
            __html: data?.Description?.substring(0, maxLength) ?? "",
          }}
        />
        <div className="mt-3 flex items-center text-center gap-x-3">
          <Image src={greenstars} alt="rating stars" className="h-[3vh] w-[14vh]" />
          <p className={`${leagueSpartan.className} font-heading text-small font-medium`}>
            {data?.["Success rate"]}
          </p>
        </div>
        <PopUpButton
          text={locale === "ar" ? "احجز حصة تجريبية" : "Book A Demo"}
          href="popup"
          className="my-5 w-full self-center transition-all duration-500 ease-in-out hover:scale-[1.02]"
          style={{
            boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
            backgroundColor: "#38b6ff",
            lineHeight: "18.4px",
            borderRadius: "10px",
            padding: "18px",
            color: "white",
          }}
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
