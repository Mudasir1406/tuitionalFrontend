import React from "react";
import * as cheerio from "cheerio";
import dynamic from "next/dynamic";
import Image from "next/image";

import { Header } from "@/components";
import { AllBlogsData, PageData } from "@/types/grade-subject-level.types";
import LeftSection from "../left-section/left-section";
import PostCTA from "../postCTA/PostCTA";

const Hero = dynamic(() => import("@/components/blog/hero-nested/Hero"), { ssr: true });
const ServerFooter = dynamic(() => import("@/components/server-footer"), { ssr: true });
const Breadcrumb = dynamic(() => import("@/components/bread-crumb/bread-crumb"), { ssr: true });
const RelatedBlogs = dynamic(() => import("../relatedBlogs/RelatedBlogs"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("@/components/grade-subject-level/faqs"), { ssr: true });
const AuthorSocial = dynamic(() => import("../author-social/AuthorSocial"), { ssr: false });
const BlogAuthorProfile = dynamic(() => import("../author-profile/BlogAuthorProfile"), { ssr: true });

type IProps = {
  data: PageData;
  allBlogs: AllBlogsData[] | null | undefined;
  allTags: { name: { en: string; ar: string }; id: string }[];
  allCategories: { name: { en: string; ar: string }; id: string }[];
};

const processHtmlContent = (html: string) => {
  const $ = cheerio.load(html);
  $(".ql-ui").remove();
  $("ol").each(function () {
    const $list = $(this);
    if ($list.find("li[data-list='bullet']").length > 0) {
      $list.replaceWith($("<ul>").append($list.contents()));
    }
  });
  $("li[data-list]").removeAttr("data-list");
  return $.html();
};

const BlogSequences: React.FC<IProps> = ({ data, allBlogs, allTags, allCategories }) => {
  const entries = Object.entries(data);
  const authorProfileData = (data as any)?.authorProfile;

  const renderRightContent = (name: string) => {
    if (name.includes("blogContent")) {
      const rawContent = (data?.[name as keyof PageData] as any)?.content || "";
      return (
        data?.[name as keyof PageData] && (
          <div className="my-6">
            <div
              className="prose font-heading text-ink-900 max-w-none"
              dangerouslySetInnerHTML={{ __html: processHtmlContent(rawContent) }}
            />
          </div>
        )
      );
    }
    if (name.includes("authorProfile")) return null;
    if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <div className="my-6">
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    }
    if (name.includes("postCTA")) {
      return (
        (data?.[name as keyof PageData] as any)?.isShow && (
          <div className="my-6">
            <PostCTA />
          </div>
        )
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      {entries
        .filter(([key]) => key.trim().includes("heroSection"))
        .map(([key]) => {
          const sectionData = data?.[key as keyof PageData] as any;
          return (
            <div key={key}>
              <Hero
                data={sectionData}
                timestamp={data?.timestamp?.seconds}
                showSocial={sectionData?.socialShare}
                authorProfile={authorProfileData}
              />
              {sectionData?.image && (
                <div className="relative mx-auto h-[40vh] max-w-screen-xl">
                  <Image
                    src={sectionData.image}
                    alt={sectionData?.imageAltText || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mx-auto max-w-screen-xl px-4">
                <div className="my-4">
                  <Breadcrumb />
                </div>
              </div>
            </div>
          );
        })}

      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <LeftSection tags={allTags} categories={allCategories} />
        </div>
        <div className="lg:col-span-9">
          {entries
            .filter(([key]) => !key.trim().includes("heroSection"))
            .map(([key]) => (
              <div key={key}>{renderRightContent(key.trim())}</div>
            ))}
          {authorProfileData?.authorName && (
            <div className="my-6">
              <BlogAuthorProfile data={authorProfileData} />
            </div>
          )}
          {allBlogs && allBlogs.length > 0 && (
            <div className="my-6">
              <RelatedBlogs blogs={allBlogs} />
            </div>
          )}
        </div>
      </div>
      <ServerFooter />
    </>
  );
};

export default BlogSequences;
