import React from "react";
import Image from "next/image";

interface AuthorProfileData {
  authorName?: string;
  authorImage?: string;
  blogDate?: string;
  authorAbout?: string;
  authorCountry?: string;
  authorStars?: number;
}

interface Props {
  data: AuthorProfileData;
}

const StarRating = ({ stars }: { stars: number }) => (
  <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < stars ? "text-warning" : "text-ink-300"}>
        ★
      </span>
    ))}
  </div>
);

const BlogAuthorProfile: React.FC<Props> = ({ data }) => {
  if (!data?.authorName) return null;

  return (
    <div className="my-6">
      <div className="flex flex-col gap-4 rounded-md bg-brand-50 p-4 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-white">
          {data.authorImage ? (
            <Image src={data.authorImage} alt={data.authorName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-200 font-heading text-h2 text-white">
              {data.authorName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="font-heading text-h6 text-ink-900">{data.authorName}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
            {data.authorCountry && (
              <span className="font-heading text-small text-ink-700">
                📍 {data.authorCountry}
              </span>
            )}
            {data.blogDate && (
              <span className="font-heading text-small text-ink-700">
                🗓 {data.blogDate}
              </span>
            )}
          </div>
          {data.authorStars ? <StarRating stars={Number(data.authorStars)} /> : null}
          {data.authorAbout && (
            <p className="mt-2 font-heading text-small text-ink-800">{data.authorAbout}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAuthorProfile;
