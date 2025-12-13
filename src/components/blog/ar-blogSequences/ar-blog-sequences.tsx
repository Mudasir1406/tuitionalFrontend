import React, { ReactNode } from "react";
import * as cheerio from "cheerio";

import ArHeader from "@/components/ar-header";
import dynamic from "next/dynamic";

import styles from "./Ar-BlogSequences.module.css";

const ArHeroNested = dynamic(() => import("@/components/blog/ar-hero-nested/Ar-Hero"), {
  ssr: true,
});

const ArServerFooter = dynamic(() => import("@/components/ar-server-footer"), { ssr: true });
const Breadcrumb = dynamic(
  () => import("@/components/bread-crumb/bread-crumb"),
  {
    ssr: true,
  }
);
const ArRelatedBlogs = dynamic(() => import("../ar-relatedBlogs/Ar-RelatedBlogs"), {
  ssr: true,
});
const FrequentlyQuestions = dynamic(
  () => import("@/components/grade-subject-level/faqs"),
  {
    ssr: true,
  }
);

import {
  AllBlogsData,
  Component_Sequence_Type,
  PageData,
  tutor_section,
} from "@/types/grade-subject-level.types";

import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";

import ArLeftSection from "../ar-left-section/ar-left-section";
import ArTagsAndSocial from "../ar-tags-social/Ar-TagsAndSocial";
import ArPostCTA from "../ar-postCTA/Ar-PostCTA";
import { TagItem } from "@/app/blog/[slug]/page";
import Image from "next/image";

// import  from "";
type IProps = {
  data: PageData;
  allBlogs: AllBlogsData[] | null | undefined;
  allTags: { name: { en: string; ar: string }; id: string }[];
  allCategories: { name: { en: string; ar: string }; id: string }[];
};

const ArMainSection = ({ children }: any) => {
  return <div className={`${styles.mainRight} ${styles.mainRightRTL}`}>{children}</div>;
};

const processHtmlContent = (html: string) => {
  const $ = cheerio.load(html);

  // Convert data-list attributes to proper list types
  $("li[data-list]").each(function () {
    const listType = $(this).attr("data-list");
    const listTag = listType === "bullet" ? "ul" : "ol";

    // Create new list wrapper if needed
    if ($(this).parent().is("ol, ul")) {
      $(this).unwrap();
    }
    $(this).wrap(`<${listTag}></${listTag}>`);
  });

  // Remove Quill UI elements
  $(".ql-ui").remove();

  return $.html();
};

const ArBlogInnerLayout = ({
  children,
  onlyChildren = false,
  tags,
  categories,
}: any) => {
  return (
    <div className={`${styles.container} ${styles.containerRTL}`} dir="rtl">
      <div className={styles.verticalMargin}>
        <div className={`${styles.main} ${styles.mainRTL}`}>
          <div className={`${styles.mainLeft} ${styles.mainLeftRTL}`}>
            {!onlyChildren && (
              <ArLeftSection tags={tags} categories={categories} />
            )}
          </div>
          <ArMainSection>{children}</ArMainSection>
        </div>
      </div>
    </div>
  );
};

const ArBlogSequences: React.FC<IProps> = ({
  data,
  allBlogs,
  allTags,
  allCategories,
}) => {
  let isLeftSectionRendered = false; // Flag to track LeftSection rendering


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
            <div className={styles.imageDiv}>
              <Image
                src={data?.[name as keyof PageData]?.image}
                alt={data?.[name as keyof PageData]?.imageAltText || ""}
                className={styles.blogImg}
                fill
              />
            </div>
          )}
          <div className={`${styles.container} ${styles.containerRTL}`} dir="rtl">
            <div className={styles.verticalMargin}></div>
            <div className={styles.verticalMargin}>
              <Breadcrumb />
            </div>
          </div>
        </>
      );
    } else if (name.includes("blogContent")) {
      const shouldShowLeftSection = !isLeftSectionRendered;
      isLeftSectionRendered = true;

      const rawContent = data?.[name as keyof PageData]?.content || "";
      const processedContent = processHtmlContent(rawContent);

      return (
        data?.[name as keyof PageData] && (
          <ArBlogInnerLayout
            tags={shouldShowLeftSection ? allTags : undefined}
            categories={shouldShowLeftSection ? allCategories : undefined}
            onlyChildren={!shouldShowLeftSection}
          >
            <Typography
              className={`${leagueSpartan.className} ${styles.typographyContent} ${styles.typographyContentRTL}`}
              variant={data?.[name as keyof PageData]?.headerTag || "h3"}
              component={"div"}
              dangerouslySetInnerHTML={{
                __html: processedContent,
              }}
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
    } 
    else if (name.includes("blog_tag") || name.includes("tag")) {
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
    } 
    else if (name.includes("postCTA")) {
      return (
        (data?.[name as keyof PageData]?.show || data?.[name as keyof PageData]?.isShow) && (
          <ArBlogInnerLayout onlyChildren>
            <div className={styles.verticalMargin}>
              <ArPostCTA />
            </div>
          </ArBlogInnerLayout>
        )
      );
    } else if (name.includes("relatedBlogs")) {
      return (
        (data?.[name as keyof PageData]?.show || data?.[name as keyof PageData]?.isShow) && (
          <div className={`${styles.container} ${styles.containerRTL}`} dir="rtl">
            <div className={styles.verticalMargin}>
              <ArRelatedBlogs allBlogs={allBlogs} />
            </div>
          </div>
        )
      );
    }
  };

  return (
    <>
      <ArHeader />

      {Object.entries(data).map(([key, value]) => (
        <div key={key}>{renderSection(key.trim())}</div>
      ))}

      <ArServerFooter />
    </>
  );
};

export default ArBlogSequences;