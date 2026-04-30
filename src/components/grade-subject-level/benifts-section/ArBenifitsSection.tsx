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

import { PageData } from "@/types/grade-subject-level.types";
import TutorIcon from "../../../../public/assets/icons/11036302 1.svg";

type IProps = {
  data: PageData["igcse_tutoring_program"];
};

const items: { icon: React.ReactNode; label: string }[] = [
  {
    icon: <Image src={TutorIcon} alt="Tutor Icon" width={35} height={30} />,
    label: "مجموعة من مئات المعلمين للاختيار من بينهم",
  },
  { icon: <Mic className="h-[30px] w-[35px] text-[#009BF5]" />, label: "حصص مسجلة للمراجعة" },
  { icon: <Calendar className="h-[30px] w-[35px] text-[#009BF5]" />, label: "الوصول إلى الموارد والمواد التدريبية" },
  { icon: <BookOpen className="h-[30px] w-[35px] text-[#009BF5]" />, label: "خطط دراسية مخصصة" },
  { icon: <BarChart3 className="h-[30px] w-[35px] text-[#009BF5]" />, label: "تتبع التقدم" },
  { icon: <Clock className="h-[30px] w-[35px] text-[#009BF5]" />, label: "جدولة مرنة" },
  { icon: <LineChart className="h-[30px] w-[35px] text-[#009BF5]" />, label: "تحليل ما بعد الاختبار" },
  { icon: <Users className="h-[30px] w-[35px] text-[#009BF5]" />, label: "تحديثات الوالدين" },
];

const ArBenifitsSection: React.FC<IProps> = ({ data }) => {
  const HeaderTag = (data?.sectionTag ?? "h3") as "h2" | "h3" | "h4";

  return (
    <div className="bg-brand-500 px-6 py-12 text-white sm:px-12 lg:py-16" dir="rtl">
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
    </div>
  );
};

export default ArBenifitsSection;
