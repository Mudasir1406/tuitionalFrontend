"use client";

import React from "react";
import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  LineChart,
  Mic,
  Users,
} from "lucide-react";

import PopUpButtonV2 from "@/components/pop-up-buttonV2";
import { PageData } from "@/types/grade-subject-level.types";
import TutorIcon from "../../../../public/assets/icons/11036302 1.svg";

type IProps = {
  data: PageData["igcse_tutoring_program"];
};

const items: { icon: React.ReactNode; label: string }[] = [
  {
    icon: <Image src={TutorIcon} alt="Tutor Icon" width={35} height={30} />,
    label: "Pool of 500 + Tutors",
  },
  { icon: <Mic className="h-[30px] w-[35px] text-[#009BF5]" />, label: "24/7 On-Demand Academic Support." },
  { icon: <Calendar className="h-[30px] w-[35px] text-[#009BF5]" />, label: "Access to resources & practice material" },
  { icon: <BookOpen className="h-[30px] w-[35px] text-[#009BF5]" />, label: "Customized Study Plans" },
  { icon: <BarChart3 className="h-[30px] w-[35px] text-[#009BF5]" />, label: "Progress Tracking" },
  { icon: <Clock className="h-[30px] w-[35px] text-[#009BF5]" />, label: "Flexible Scheduling" },
  { icon: <LineChart className="h-[30px] w-[35px] text-[#009BF5]" />, label: "Post-Test Analysis" },
  { icon: <Users className="h-[30px] w-[35px] text-[#009BF5]" />, label: "Real-Time Parent Dashboard" },
];

const BenifitsSectionV2: React.FC<IProps> = ({ data }) => {
  const HeaderTag = (data?.sectionTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="bg-brand-500 px-6 py-12 text-white sm:px-12 lg:py-16">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-white"
        dangerouslySetInnerHTML={{ __html: data?.section ?? "" }}
      />

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-3 rounded-md bg-white p-4 text-center shadow-card"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
              {item.icon}
            </div>
            <p className="font-heading text-small text-ink-900">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-9 flex justify-center">
        <PopUpButtonV2
          text="Book a Demo"
          href="popup"
          className="w-1/2 rounded-[10px] py-[1vh] transition-all duration-500 ease-in-out hover:scale-105 sm:w-2/5 md:w-[30%] lg:w-[30%] lg:py-[10px]"
          style={{
            boxShadow: "1px 4px 24px 0px #38B6FFB2",
            backgroundColor: "white",
            color: "#38B6FF",
          }}
        />
      </div>
    </div>
  );
};

export default BenifitsSectionV2;
