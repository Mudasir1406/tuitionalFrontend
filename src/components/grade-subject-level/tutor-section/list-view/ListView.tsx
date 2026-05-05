"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BarChart3, Clock, LineChart, Mic, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import TeacherCard from "@/components/teacher-card/TeacherCard";
import TutorIcon from "../../../../../public/assets/icons/11036302 1.svg";

interface props {
  data: any[];
  locale?: string;
}

const translations = {
  en: {
    showMore: "Show More",
    vettedTutor: "Vetted Tutor",
    vettedTutorDescription:
      "Our tutors go through a rigorous selection process, having been interviewed to assess their teaching skills & subject knowledge. They have extensive tutoring experience with a track record of success, helping students achieve their academic goals.",
    poolOfTutors: "Pool of 100s of Tutors to choose from",
    recordedClasses: "Recorded classes for review",
    progressTracking: "Progress Tracking",
    flexibleScheduling: "Flexible Scheduling",
    postTestAnalysis: "Post-Test Analysis",
    parentalUpdates: "Parental Updates",
  },
  ar: {
    showMore: "عرض المزيد",
    vettedTutor: "مدرس معتمد",
    vettedTutorDescription:
      "يخضع مدرسونا لعملية انتقاء صارمة، حيث تتم مقابلتهم لتقييم مهاراتهم التدريسية ومعرفتهم بالمادة. لديهم خبرة تدريس واسعة مع سجل حافل بالنجاح، مما يساعد الطلاب على تحقيق أهدافهم الأكاديمية.",
    poolOfTutors: "مجموعة من المئات من المدرسين للاختيار من بينهم",
    recordedClasses: "فصول مسجلة للمراجعة",
    progressTracking: "تتبع التقدم",
    flexibleScheduling: "جدولة مرنة",
    postTestAnalysis: "تحليل ما بعد الاختبار",
    parentalUpdates: "تحديثات أولياء الأمور",
  },
};

function ListView({ data, locale = "en" }: props) {
  const [showFull, setShowFull] = useState(false);
  const t = translations[locale as keyof typeof translations];

  const smallCards = [
    { icon: <User className="h-[30px] w-[35px] text-[#009BF5]" />, label: t.poolOfTutors },
    { icon: <Mic className="h-[30px] w-[35px] text-[#009BF5]" />, label: t.recordedClasses },
    { icon: <BarChart3 className="h-[30px] w-[35px] text-[#009BF5]" />, label: t.progressTracking },
    { icon: <Clock className="h-[30px] w-[35px] text-[#009BF5]" />, label: t.flexibleScheduling },
    { icon: <LineChart className="h-[30px] w-[35px] text-[#009BF5]" />, label: t.postTestAnalysis },
    { icon: <Users className="h-[30px] w-[35px] text-[#009BF5]" />, label: t.parentalUpdates },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-4 lg:col-span-8">
        {data?.slice(0, showFull ? data.length : 10).map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} locale={locale} />
        ))}
        {!showFull && data?.length > 10 && (
          <Button onClick={() => setShowFull(true)} variant="primary" className="self-center font-heading">
            {t.showMore}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:col-span-4">
        <div className="flex flex-col items-center rounded-md bg-white p-6 text-center shadow-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <Image src={TutorIcon} alt="Tutor Icon" width={50} height={50} />
          </div>
          <p className="mt-4 font-heading text-h5 text-ink-900">{t.vettedTutor}</p>
          <p className="mt-2 font-heading text-small text-ink-700">{t.vettedTutorDescription}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {smallCards.map((card, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 rounded-md bg-white p-3 text-center shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                {card.icon}
              </div>
              <p className="font-heading text-small text-ink-900">{card.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListView;
