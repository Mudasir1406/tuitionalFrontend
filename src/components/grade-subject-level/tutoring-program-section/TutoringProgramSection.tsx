"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import PopUpButton from "@/components/pop-up-button";

interface props {
  data: {
    headerTag: string;
    header: string;
    paragraph: string;
    buttonTitle: string;
    buttonLink: string;
  };
}

function TutoringProgramSection({ data }: props) {
  const HeaderTag = (data?.headerTag ?? "h3") as "h2" | "h3" | "h4";
  const handleRedirect = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="px-6 py-12 text-center lg:py-16">
      <HeaderTag
        className="font-heading text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div
        className="mx-auto mt-6 max-w-3xl font-heading text-body text-ink-700"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      {data?.buttonTitle && (
        <div className="mt-6 flex justify-center">
          {data?.buttonLink === "popup" ? (
            <PopUpButton
              text={data.buttonTitle}
              href="popup"
              className="px-[25px] py-[1.5vh] md:px-[22px] md:py-[2vh] lg:px-[25px]"
              style={{
                boxShadow: "1px 15px 34px 0px rgba(0,0,0,0.2)",
                backgroundColor: "rgba(56,182,255,1)",
                borderRadius: "10px",
                color: "white",
              }}
            />
          ) : (
            <Button onClick={() => handleRedirect(data.buttonLink)} variant="primary" size="lg">
              {data.buttonTitle}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default TutoringProgramSection;
