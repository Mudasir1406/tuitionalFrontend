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
  const HeaderTag = ((data?.sectionTag ?? "h3").toLowerCase()) as "h2" | "h3" | "h4";

  return (
    <div className="bg-gradient-to-b from-white to-[#58b9f6] px-6 pb-[5vh] pt-0 sm:pb-[6vh]" dir="rtl">
      <HeaderTag
        className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3"
        dangerouslySetInnerHTML={{ __html: data?.section ?? "" }}
      />

      <div className="mx-auto mt-6 grid w-full grid-cols-2 gap-4 min-[992px]:w-4/5 min-[992px]:grid-cols-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex h-[100px] flex-col items-center justify-center rounded-lg bg-white p-4 text-center transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[inset_0px_6px_10px_rgba(0,0,0,0.15),0px_4px_10px_rgba(0,0,0,0.1)] sm:h-[140px]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7ff]">
              {item.icon}
            </div>
            <p className="font-heading text-caption">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArBenifitsSection;
