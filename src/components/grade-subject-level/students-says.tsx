import React from "react";
import { PageData } from "@/types/grade-subject-level.types";
import { getVideoReviews } from "@/services/video-reviews/video-reviews";

const StudentSays: React.FC<{ data: PageData["what_our_student_says"] }> = async ({ data }) => {
  const videoData = await getVideoReviews();
  const HeaderTag = (data?.headerTag ?? "h2") as "h2" | "h3" | "h4";

  return (
    <div className="mx-[3vw] flex flex-col items-center justify-center px-0 lg:mx-[2vh] lg:px-[5vw]">
      <HeaderTag
        className="text-center font-heading text-h2-mobile sm:text-h2-tablet md:text-start lg:text-start lg:text-h2 text-ink-900"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div
        className="w-full px-0 py-[2vh] pb-[4vh] text-center font-heading text-body-mobile text-ink-900 sm:text-body md:text-start lg:w-[139vh] lg:py-[1vh] lg:pb-[3vh] lg:text-center"
        dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
      />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videoData.map((poster, index) => (
          <div key={index} className="overflow-hidden rounded-[20px]">
            <video
              src={poster.video}
              controls
              poster={poster.thumbnil}
              className="h-[165px] w-full lg:h-[48vh]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSays;
