"use client";

import * as React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

type IProps = {
  question: string;
  answer: string;
};

const Questions: React.FC<IProps> = ({ question, answer }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="mt-[2vh] rounded-[15px] bg-white py-[2vh] shadow-[1px_5px_20px_0px_rgba(56,182,255,0.2)]">
          <DisclosureButton className="flex w-full items-center justify-between px-[10px] text-start font-heading text-[2.3vh] font-medium leading-[2.7vh] text-black sm:text-[2.6vh] sm:leading-[2.8vh] md:text-[2.8vh] md:leading-[3.2vh] lg:text-[2.8vh] lg:leading-[3.4vh]">
            <span>{question}</span>
            {open ? (
              <Minus className="text-black" aria-hidden="true" />
            ) : (
              <Plus className="text-black" aria-hidden="true" />
            )}
          </DisclosureButton>
          {open && (
            <>
              <hr className="mx-auto my-2 w-[95%] border-ink-200" />
              <DisclosurePanel className="my-5 ms-[1.5%] font-heading text-small text-black">
                {answer}
              </DisclosurePanel>
            </>
          )}
        </div>
      )}
    </Disclosure>
  );
};

export default Questions;
