import React, { ReactNode } from "react";

import { Header } from "@/components";
import dynamic from "next/dynamic";
import students from "../../../../public/assets/images/static/young-students-learning-together-group-study.png";
import dumyimg1 from "../../../../public/assets/images/static/Girl_in_circle.png";
import dumyimg2 from "../../../../public/assets/images/static/young-students-learning-together-group-study.png";
import styles from "./BlogSequences.module.css";

const Hero = dynamic(() => import("@/components/blog/hero-nested/Hero"), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/footer"), { ssr: true });
const Breadcrumb = dynamic(
  () => import("@/components/bread-crumb/bread-crumb"),
  {
    ssr: true,
  }
);
const RelatedBlogs = dynamic(() => import("../relatedBlogs/RelatedBlogs"), {
  ssr: true,
});

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
  allTags: { name: string; id: string }[];
  allCategories: { name: string; id: string }[];
};

const MainSection = ({ children }: any) => {
  return <div className={styles.mainRight}>{children}</div>;
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

  console.log("GradeSubjectLevel", data);
  // console.log("BlogSequences", allTags);

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
      isLeftSectionRendered = true; // Mark LeftSection as rendered

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
                __html: data?.[name as keyof PageData]?.content,
              }}
            ></Typography>
            {/* </div> */}
          </BlogInnerLaylout>
        )
      );
    } else if (name.includes("blog_tag")) {
      return (
        data?.[name as keyof PageData] && (
          <BlogInnerLaylout onlyChildren>
            {/* <div className={styles.container}> */}
            <TagsAndSocial
              tags={data?.[name as keyof PageData]?.tags}
              showSocial={data?.postCTA?.isShow}
            />
            {/* </div> */}
          </BlogInnerLaylout>
        )
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

      <Footer />
    </>
  );
};

export default BlogSequences;
