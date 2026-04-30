import React, { useState } from "react";
import { leagueSpartan } from "@/app/fonts";
import dummyImg from "../../../public/assets/images/static/blogimg3.png";
import Image from "next/image";

import PopUpButton from "../pop-up-button";
import dynamic from "next/dynamic";

const TutorModal = dynamic(() => import("../home/tutor-modal"), { ssr: false });

type Teacher = {
  "First Name": string;
  "Last Name": string;
  "Hours Taught": number;
  Description: string;
  Subjects: string[];
  profileImageUrl: string;
};

type TeacherCardProps = {
  teacher: Teacher;
  locale?: string;
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, locale = "en" }) => {
  const [tutorModal, setTutorModal] = useState(false);

  const maxLength = 120;

  const translations = {
    en: {
      bookADemo: "Book A Demo",
      viewProfile: "View Profile",
      tutorHoursProvided: "Tutor Hours Provided",
    },
    ar: {
      bookADemo: "احجز حصة تجريبية",
      viewProfile: "عرض الملف الشخصي",
      tutorHoursProvided: "ساعات التدريس المقدمة",
    },
  };

  const t = translations[locale as keyof typeof translations];

  return (
    <div className="mx-auto my-4 flex w-[92%] items-center justify-between rounded-xl bg-white p-3 shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] sm:w-[95%] sm:p-4">
      <div className="flex w-full flex-col items-center sm:flex-row">
        <div className="me-0 mb-4 shrink-0 sm:me-4 sm:mb-0">
          <Image
            src={teacher?.profileImageUrl ? teacher?.profileImageUrl : dummyImg}
            alt="Tutor Icon"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
        <div className="me-0 grow text-center sm:me-4 sm:text-start">
          <h5 className={`${leagueSpartan.className} font-heading text-h5 text-ink-900`}>
            {`${teacher?.["First Name"]} ${teacher?.["Last Name"]}`}
          </h5>
          <span className={`${leagueSpartan.className} font-heading text-caption font-semibold`}>
            +{teacher?.["Hours Taught"]} {t.tutorHoursProvided}
          </span>
          <div
            className={`${leagueSpartan.className} mt-1.5 font-heading text-small text-ink-700`}
            dangerouslySetInnerHTML={{
              __html: teacher?.Description?.substring(0, maxLength) ?? "",
            }}
          />
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <PopUpButton
            text={t.bookADemo}
            href="popup"
            className="w-full self-center transition-all duration-500 ease-in-out hover:scale-[1.02]"
            style={{
              boxShadow: "1px 15px 34px 0px rgba(56, 182, 255, 0.4)",
              backgroundColor: "#38b6ff",
              lineHeight: "18.4px",
              borderRadius: "10px",
              padding: "2vh",
              color: "white",
            }}
          />
          <button
            type="button"
            onClick={() => setTutorModal(true)}
            className={`${leagueSpartan.className} self-center rounded-[10px] border-2 border-[green] bg-white p-[2vh] font-heading text-[green] normal-case leading-[18.4px] transition-all duration-500 hover:scale-[1.02]`}
          >
            {t.viewProfile}
          </button>
        </div>
      </div>

      {tutorModal && (
        <TutorModal
          handleClose={() => setTutorModal(false)}
          open={tutorModal}
          data={teacher as any}
          locale={locale}
        />
      )}
    </div>
  );
};

export default TeacherCard;
