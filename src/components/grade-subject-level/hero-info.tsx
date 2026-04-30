"use client";

import React, { useState } from "react";
import Image from "next/image";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";

type IProps = {
  image: string;
  imageAltText: string;
};

const HeroInfo: React.FC<IProps> = ({ image, imageAltText }) => {
  const validSrc =
    image?.trim() && image.trim() !== "undefined" ? image.trim() : subjectLevelImage.src;
  const [src, setSrc] = useState(validSrc);

  return (
    <div className="relative mt-[2.5vh] h-[45vh] w-full sm:mt-0 sm:h-[80vh] md:mt-[1.5vh] md:h-[70vh] lg:mt-[1vh] lg:h-[80vh]">
      <Image
        alt={imageAltText || ""}
        src={src}
        fill
        priority
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 50vw"
        style={{ objectFit: "contain", objectPosition: "bottom" }}
        onError={() => setSrc(subjectLevelImage.src)}
      />
    </div>
  );
};

export default HeroInfo;
