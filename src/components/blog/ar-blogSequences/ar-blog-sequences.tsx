import React from "react";
import * as cheerio from "cheerio";
import dynamic from "next/dynamic";
import Image from "next/image";

import ArHeader from "@/components/header";
import {
  AllBlogsData,
  PageData,
} from "@/types/grade-subject-level.types";

import ArLeftSection from "../ar-left-section/ar-left-section";
import ArTagsAndSocial from "../ar-tags-social/Ar-TagsAndSocial";
import ArPostCTA from "../ar-postCTA/Ar-PostCTA";

const ArHeroNested = dynamic(() => import("@/components/blog/ar-hero-nested/Ar-Hero"), { ssr: true });
const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });
const Breadcrumb = dynamic(() => import("@/components/bread-crumb/bread-crumb"), { ssr: true });
const ArRelatedBlogs = dynamic(() => import("../ar-relatedBlogs/Ar-RelatedBlogs"), { ssr: true });
const FrequentlyQuestions = dynamic(() => import("@/components/grade-subject-level/faqs"), { ssr: true });

type IProps = {
  data: PageData;
  allBlogs: AllBlogsData[] | null | undefined;
  allTags: { name: { en: string; ar: string }; id: string }[];
  allCategories: { name: { en: string; ar: string }; id: string }[];
};

const ArMainSection = ({ children }: any) => (
  <div className="lg:col-span-9">{children}</div>
);

const processHtmlContent = (html: string) => {
  const $ = cheerio.load(html);
  $("li[data-list]").each(function () {
    const listType = $(this).attr("data-list");
    const listTag = listType === "bullet" ? "ul" : "ol";
    if ($(this).parent().is("ol, ul")) $(this).unwrap();
    $(this).wrap(`<${listTag}></${listTag}>`);
  });
  $(".ql-ui").remove();
  return $.html();
};

const ArBlogInnerLayout = ({ children, onlyChildren = false, tags, categories }: any) => (
  <div className="mx-auto max-w-screen-xl px-4 py-6" dir="rtl">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        {!onlyChildren && <ArLeftSection tags={tags} categories={categories} />}
      </div>
      <ArMainSection>{children}</ArMainSection>
    </div>
  </div>
);

const ArBlogSequences: React.FC<IProps> = ({ data, allBlogs, allTags, allCategories }) => {
  let isLeftSectionRendered = false;

  const renderSection = (name: string) => {
    if (name.includes("heroSection")) {
      return (
        <>
          <ArHeroNested
            data={data?.[name as keyof PageData]}
            timestamp={data?.timestamp?.seconds}
            showSocial={data?.[name as keyof PageData]?.socialShare}
          />
          {data?.[name as keyof PageData]?.image && (
            <div className="relative mx-auto h-[40vh] max-w-screen-xl">
              <Image
                src={data?.[name as keyof PageData]?.image}
                alt={data?.[name as keyof PageData]?.imageAltText || ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="mx-auto max-w-screen-xl px-4" dir="rtl">
            <div className="my-4">
              <Breadcrumb />
            </div>
          </div>
        </>
      );
    } else if (name.includes("blogContent")) {
      const shouldShowLeftSection = !isLeftSectionRendered;
      isLeftSectionRendered = true;
      const rawContent = data?.[name as keyof PageData]?.content || "";
      return (
        data?.[name as keyof PageData] && (
          <ArBlogInnerLayout
            tags={shouldShowLeftSection ? allTags : undefined}
            categories={shouldShowLeftSection ? allCategories : undefined}
            onlyChildren={!shouldShowLeftSection}
          >
            <div
              className="prose font-heading text-ink-900 max-w-none"
              dangerouslySetInnerHTML={{ __html: processHtmlContent(rawContent) }}
            />
          </ArBlogInnerLayout>
        )
      );
    } else if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <ArBlogInnerLayout onlyChildren>
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </ArBlogInnerLayout>
        )
      );
    } else if (name.includes("blog_tag") || name.includes("tag")) {
      return (
        data?.[name as keyof PageData] && (
          <ArBlogInnerLayout onlyChildren>
            <ArTagsAndSocial
              tags={data?.[name as keyof PageData]?.data || allTags}
              showSocial={data?.postCTA?.isShow}
            />
          </ArBlogInnerLayout>
        )
      );
    } else if (name.includes("postCTA")) {
      return (
        (data?.[name as keyof PageData]?.show || data?.[name as keyof PageData]?.isShow) && (
          <ArBlogInnerLayout onlyChildren>
            <div className="my-4">
              <ArPostCTA />
            </div>
          </ArBlogInnerLayout>
        )
      );
    } else if (name.includes("relatedBlogs")) {
      return (
        (data?.[name as keyof PageData]?.show || data?.[name as keyof PageData]?.isShow) && (
          <div className="mx-auto max-w-screen-xl px-4 my-6" dir="rtl">
            <ArRelatedBlogs allBlogs={allBlogs} />
          </div>
        )
      );
    }
  };

  return (
    <>
      <ArHeader />
      {Object.entries(data).map(([key]) => (
        <div key={key}>{renderSection(key.trim())}</div>
      ))}
      <ArServerFooter />
    </>
  );
};

export default ArBlogSequences;
