"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { Dialog as HouseDialog } from "@/components/ui/dialog";
import PopUpButton from "../pop-up-button";
import Tag from "../tag/Tag";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import greenstars from "../../../public/assets/images/svg/greenstars.svg";

type IProps = {
  open: boolean;
  handleClose: () => void;
  data: tutorData;
  locale?: string;
};

export type tutorData = {
  "First Name": string;
  "Last Name"?: string;
  university: string;
  Subjects: string[];
  Curiculum: string[];
  Description: string;
  "Success rate": number;
  profileImageUrl: string;
};

const TutorModal: React.FC<IProps> = ({ open, handleClose, data, locale = "en" }) => {
  const translations = {
    en: { bookADemo: "Book A Demo" },
    ar: { bookADemo: "احجز حصة تجريبية" },
  };
  const t = translations[locale as keyof typeof translations];

  return (
    <HouseDialog open={open} onClose={handleClose} hideCloseButton size="lg">
      <div className="-m-4 sm:-m-6 rounded-[30px] bg-white shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)] overflow-hidden w-[83vw] md:w-[50vw]">
        <div className="mt-[3vh] mb-[2vh] mx-[3vh] flex items-center justify-between">
          <h2 className="font-heading text-[3vh] font-medium leading-[2.2vh] tracking-tight text-black">
            {`${data?.["First Name"]} ${data?.["Last Name"]} `}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer"
            aria-label="Close"
          >
            <X size={30} />
          </button>
        </div>
        <hr className="border-ink-200" />

        <div className="max-h-[70vh] overflow-y-auto px-[2%] py-[2%]">
          <div className="relative h-[250px] w-full overflow-hidden rounded-xl">
            <Image
              src={data?.profileImageUrl ? data?.profileImageUrl : dummyImg}
              alt={`${data?.["First Name"]}'s profile`}
              fill
              className="object-contain"
            />
          </div>
          <div className="p-4">
            <p className="font-heading text-stat-number-mobile">
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
            <p className="font-heading text-small">{data.university}</p>
            <p
              className="font-heading text-small"
              dangerouslySetInnerHTML={{ __html: data?.Description }}
            />
            <div className="mt-3 flex items-center text-center gap-x-3">
              <Image
                src={greenstars}
                alt="rating stars"
                style={{ height: "3vh", width: "14vh" }}
              />
              <p className="font-heading text-small font-medium">
                {data?.["Success rate"]}
              </p>
            </div>
            <PopUpButton
              text={t.bookADemo}
              href="popup"
              className="w-full self-center transition-all duration-500 ease-in-out hover:scale-[1.02]"
              style={{
                boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
                backgroundColor: "#38b6ff",
                lineHeight: "18.4px",
                borderRadius: "10px",
                padding: "18px",
                margin: "20px 0",
                color: "white",
              }}
            />
          </div>
        </div>
      </div>
    </HouseDialog>
  );
};

export default TutorModal;
