import React from "react";
import Image from "next/image";
import subjectLevelImage from "../../../public/assets/images/static/subject-level.png";

type IProps = {
  image: string;
  imageAltText: string;
};

const ArHeroInfo: React.FC<IProps> = ({ image, imageAltText }) => {
  const src = image || subjectLevelImage.src;
  return (
    <div
      dir="ltr"
      className="relative h-full w-full md:h-[70vh] lg:h-[80vh]"
    >
      <div
        className="absolute bottom-0 left-0 z-0 h-full w-full bg-bottom bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
        aria-hidden="true"
      />
      <Image
        className="sr-only"
        alt={imageAltText}
        src={image}
        width={1}
        height={1}
        loading="lazy"
      />
    </div>
  );
};

export default ArHeroInfo;
