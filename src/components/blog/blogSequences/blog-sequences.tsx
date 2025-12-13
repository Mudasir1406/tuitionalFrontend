import React, { ReactNode } from "react";
import * as cheerio from "cheerio";

import { Header } from "@/components";
import dynamic from "next/dynamic";

import styles from "./BlogSequences.module.css";

const Hero = dynamic(() => import("@/components/blog/hero-nested/Hero"), {
  ssr: true,
});

const ServerFooter = dynamic(() => import("@/components/server-footer"), { ssr: true });
const Breadcrumb = dynamic(
  () => import("@/components/bread-crumb/bread-crumb"),
  {
    ssr: true,
  }
);
const RelatedBlogs = dynamic(() => import("../relatedBlogs/RelatedBlogs"), {
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

import LeftSection from "../left-section/left-section";
import TagsAndSocial from "../tags-social/TagsAndSocial";
import PostCTA from "../postCTA/PostCTA";
import { TagItem } from "@/app/blog/[slug]/page";
import Image from "next/image";

// import  from "";
type IProps = {
  data: PageData;
  allBlogs: AllBlogsData[] | null | undefined;
  allTags: { name: { en: string; ar: string }; id: string }[];
  allCategories: { name: { en: string; ar: string }; id: string }[];
};

const MainSection = ({ children }: any) => {
  return <div className={styles.mainRight}>{children}</div>;
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
const BlogInnerLaylout = ({
  children,
  onlyChildren = false,
  tags,
  categories,
}: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.verticalMargin}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            {!onlyChildren && (
              <LeftSection tags={tags} categories={categories} />
            )}
          </div>
          <MainSection>{children}</MainSection>
        </div>
      </div>
    </div>
  );
};

const BlogSequences: React.FC<IProps> = ({
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
          <Hero
            data={data?.[name as keyof PageData]}
            timestamp={data?.timestamp?.seconds}
            showSocial={data?.[name as keyof PageData]?.socialShare}
          />
          {data?.[name as keyof PageData]?.image && (
            <div className={styles.imageDiv}>
              <Image
                src={data?.[name as keyof PageData]?.image}
                alt={data?.[name as keyof PageData]?.imageAltText}
                className={styles.blogImg}
                fill
              />
            </div>
          )}
          <div className={styles.container}>
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
          <BlogInnerLaylout
            tags={shouldShowLeftSection ? allTags : undefined}
            categories={shouldShowLeftSection ? allCategories : undefined}
            onlyChildren={!shouldShowLeftSection}
          >
            {/* <div className={styles.verticalMargin}> */}
            <Typography
              className={`${leagueSpartan.className} ${styles.typographyContent}`}
              variant={data?.[name as keyof PageData]?.headerTag || "h3"}
              component={"div"}
              dangerouslySetInnerHTML={{
                __html: processedContent,
              }}
            ></Typography>
            {/* </div> */}
          </BlogInnerLaylout>
        )
      );
    } else if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <BlogInnerLaylout onlyChildren>
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </BlogInnerLaylout>
        )
      );
    } 
    else if (name.includes("blog_tag") || name.includes("tag")) {
      return (
        <BlogInnerLaylout onlyChildren>
          {/* <div className={styles.container}> */}
          <TagsAndSocial
            tags={data?.[name as keyof PageData]?.data || allTags}
            showSocial={data?.postCTA?.isShow}
          />
          {/* </div> */}
        </BlogInnerLaylout>
      );
    } else if (name.includes("postCTA")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <BlogInnerLaylout onlyChildren>
            {/* <div className={styles.container}> */}
            <div className={styles.verticalMargin}>
              <PostCTA />
            </div>
            {/* </div> */}
          </BlogInnerLaylout>
        )
      );
    } else if (name.includes("relatedBlogs")) {
      return (
        data?.[name as keyof PageData].isShow && (
          <div className={styles.container}>
            <div className={styles.verticalMargin}>
              <RelatedBlogs blogs={allBlogs} />
            </div>
          </div>
        )
      );
    }
  };

  return (
    <>
      <Header />

      {Object.entries(data).map(([key, value]) => (
        <div key={key}>{renderSection(key.trim())}</div>
      ))}

      <ServerFooter />
    </>
  );
};

export default BlogSequences;
