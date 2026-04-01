import React from "react";
import * as cheerio from "cheerio";

import { Header } from "@/components";
import dynamic from "next/dynamic";

import styles from "./BlogSequences.module.css";

const Hero = dynamic(() => import("@/components/blog/hero-nested/Hero"), {
  ssr: true,
});
const ServerFooter = dynamic(() => import("@/components/server-footer"), {
  ssr: true,
});
const Breadcrumb = dynamic(
  () => import("@/components/bread-crumb/bread-crumb"),
  { ssr: true },
);
const RelatedBlogs = dynamic(() => import("../relatedBlogs/RelatedBlogs"), {
  ssr: true,
});
const FrequentlyQuestions = dynamic(
  () => import("@/components/grade-subject-level/faqs"),
  { ssr: true },
);
const AuthorSocial = dynamic(() => import("../author-social/AuthorSocial"), {
  ssr: false,
});
const BlogAuthorProfile = dynamic(
  () => import("../author-profile/BlogAuthorProfile"),
  { ssr: true },
);

import { AllBlogsData, PageData } from "@/types/grade-subject-level.types";
import { leagueSpartan } from "@/app/fonts";
import LeftSection from "../left-section/left-section";
import PostCTA from "../postCTA/PostCTA";
import Image from "next/image";

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

const BlogSequences: React.FC<IProps> = ({
  data,
  allBlogs,
  allTags,
  allCategories,
}) => {
  const entries = Object.entries(data);

  // Locate authorProfile data (if this blog has one)
  const authorProfileData = (data as any)?.authorProfile;

  const renderRightContent = (name: string) => {
    if (name.includes("blogContent")) {
      const rawContent = (data?.[name as keyof PageData] as any)?.content || "";
      return (
        data?.[name as keyof PageData] && (
          <div className={styles.rightSection}>
            <div
              className={`${leagueSpartan.className} ${styles.typographyContent}`}
              dangerouslySetInnerHTML={{
                __html: processHtmlContent(rawContent),
              }}
            />
          </div>
        )
      );
    }
    if (name.includes("authorProfile")) {
      // Rendered explicitly at the bottom — skip here to control position
      return null;
    }
    if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <div className={styles.rightSection}>
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    }
    if (name.includes("postCTA")) {
      return (
        (data?.[name as keyof PageData] as any)?.isShow && (
          <div className={styles.rightSection}>
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

      {/* ── Full-width: hero section ── */}
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
                <div className={styles.imageDiv}>
                  <Image
                    src={sectionData.image}
                    alt={sectionData?.imageAltText || ""}
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
            </div>
          );
        })}

      {/* ── Two-column: static form left, scrollable content right ── */}
      <div className={styles.twoColumnLayout}>
        <div className={styles.leftCol}>
          <LeftSection tags={allTags} categories={allCategories} />
        </div>

        <div className={styles.rightCol}>
          {/* Blog content sections (blogContent, Faqs, postCTA) */}
          {entries
            .filter(([key]) => !key.trim().includes("heroSection"))
            .map(([key]) => (
              <div key={key}>{renderRightContent(key.trim())}</div>
            ))}

          {/* Author profile card — bottom of content */}
          {authorProfileData?.authorName && (
            <div className={styles.rightSection}>
              <BlogAuthorProfile data={authorProfileData} />
            </div>
          )}

          {/* Related articles */}
          {allBlogs && allBlogs.length > 0 && (
            <div className={styles.rightSection}>
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
