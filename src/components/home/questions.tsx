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
              <Minus className="text-black shrink-0" aria-hidden="true" />
            ) : (
              <Plus className="text-black shrink-0" aria-hidden="true" />
            )}
          </DisclosureButton>
          <DisclosurePanel
            static
            className="grid grid-rows-[0fr] transition-[grid-template-rows,opacity] duration-300 ease-in-out data-[open]:grid-rows-[1fr] data-[open]:opacity-100 opacity-0"
          >
            <div className="overflow-hidden">
              <hr className="mx-auto mt-2 w-[95%] border-ink-200" />
              <div className="my-5 ms-[1.5%] me-[1.5%] font-heading text-small text-black">
                {answer}
              </div>
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default Questions;
