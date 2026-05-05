"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ArPostCTA: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="-mt-[70px] flex w-auto items-center rounded bg-brand-500 p-5" dir="rtl">
      <div className="flex flex-col items-center justify-center gap-3 text-center w-full">
        <h3 className="font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-white">
          احجز درساً تجريبياً مجانياً
        </h3>
        <p className="font-heading text-body-mobile sm:text-body text-white">
          ابدأ رحلتك التعليمية معنا واحصل على درس تجريبي مجاني مع أفضل المدرسين
        </p>
        <Button onClick={() => setOpen(true)} variant="primary" size="lg" className="bg-white font-heading text-brand-500 hover:bg-brand-50">
          احجز درساً تجريبياً مجانياً
        </Button>
        <p className="font-heading text-small text-white/80">
          * لا توجد رسوم إضافية أو التزامات
        </p>
      </div>
    </div>
  );
};

export default ArPostCTA;
