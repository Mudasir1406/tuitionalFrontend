"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

import PopUpButton from "../pop-up-button";
import { PageData } from "@/types/grade-subject-level.types";
import tutors from "../../../public/assets/images/static/tutoring.webp";

interface IProps {
  data: PageData["demo_pointers"];
}

const DemoPointers: React.FC<IProps> = ({ data }) => {
  const HeaderTag = ((data?.headerTag || "h3").toLowerCase()) as "h2" | "h3" | "h4";

  return (
    <div className="mx-[3vw] lg:mx-[5vw]">
      <div className="grid grid-cols-1 gap-0 md:gap-4 lg:grid-cols-2">
        <div className="mb-4 sm:mb-4 md:mb-4">
          <HeaderTag
            className="text-center font-heading text-h3-mobile sm:text-start sm:text-h3-tablet lg:text-h3 text-ink-900"
            dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
          />
          <div className="text-center sm:text-start">
            <Image
              src={tutors.src}
              alt="image"
              width={tutors.width}
              height={tutors.height}
              className="h-full w-4/5"
            />
          </div>
          <PopUpButton
            href={data.buttonLink}
            text={data?.buttonText}
            className="mx-auto mb-[3vh] mt-[2vh] flex h-auto w-4/5 items-center justify-center rounded-[2vh] bg-brand-500 p-[10px_16px] leading-[1.4] text-white shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] hover:bg-brand-500 sm:w-1/2 sm:p-[12px_20px] md:w-1/2 lg:mb-0 lg:w-3/5 lg:p-[14px_24px]"
          />
        </div>

        <div className="flex flex-col gap-4">
          {data?.demoPointersData?.map((box, index) => (
            <Disclosure key={index} defaultOpen={index === 0}>
              {({ open }) => (
                <div className="rounded-xl bg-[#D3EFFF] shadow-[0px_-5px_15px_0px_rgba(56,182,255,0.2)_inset]">
                  <DisclosureButton className="flex w-full items-center justify-between px-4 py-3">
                    <p
                      className="text-start font-heading text-h6 font-semibold text-ink-900"
                      dangerouslySetInnerHTML={{ __html: box.header }}
                    />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#30AFFF] shrink-0">
                      {open ? (
                        <Minus size={18} className="text-white" />
                      ) : (
                        <Plus size={18} className="text-white" />
                      )}
                    </div>
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pb-3">
                    <p
                      className="font-heading text-small text-ink-700"
                      dangerouslySetInnerHTML={{ __html: box.body }}
                    />
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoPointers;
