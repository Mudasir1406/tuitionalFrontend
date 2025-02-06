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

// import  from "";
type IProps = {
  data: PageData;
  allBlogs: AllBlogsData[] | null | undefined;
  allTags: { name: string; id: string }[];
  allCategories: { name: string; id: string }[];
};

const dummyHtml = `<h1>Lorem Ipsum</h1>
<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Proin nec elit ac eros gravida luctus.</p>
<ul>
  <li>Phasellus accumsan</li>
  <li>Curabitur vel lectus</li>
  <li>Aenean varius neque</li>
</ul>
<p>
  <a href="https://example.com">Click here</a> for more information.
</p>`;

const dummyHtml2 = `<html lang = "en-US">
  <head>
    <meta charset = "utf-8">
    <title>My test page</title>
    
    <style>
      form {
        margin : 0 auto;
        width: 400px;
        padding : 1em;
        border : 1px solid #CCC;
        border-radius : 1em;
      }
      
      ul {
        list-style : none;
        padding : 0;
        margin : 0;
      }
      
      form li + li {
        margin-top : 1em;
      }
      
      label {
        display : inline-block;
        width : 90px;
        text-align : right;
      }
      
      input, textarea {
        font : 1em sans-serif;
        width : 300px;
        box-sizing : border-box;
        border : 1px solid #999;
      }
      
      input : focus, textarea : focus {
        border-color : #000;
      }
      
      textarea {
        vertical-align : top;
        height : 5em;
      }
      
      .button {
        padding-left : 90px;
      }
      
      button {
        margin-left : .5em;
      }
      
    </style>
  </head>
  <body>
    <p>This is my page</p>
    <form action = "/my-handling-form-page" method = "post">
      <ul>
        <li>
          <label for = "name">Name:</label>
          <input type = "text" id = "name" name = "user_name">
        </li>
        
        <li>
          <label for = "mail">E-mail:</label>
          <input type = "email" id = "mail" name = 'user_mail'>
        </li>
        
        <li>
          <label for = "msg">Message:</label>
          <textarea id = "msg" name = "user_message"></textarea>
        </li>
        
        <li class = "button">
          <button type = "submit">Send your message</button>
        </li>
      </ul>
    </form>
  </body>
</html>`;

const dummyhtml3 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dummy HTML</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .image-wrapper {
      margin: 20px 0;
      text-align: center;
    }
    .list {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Dummy HTML</h1>
    <p>
      This is a sample HTML page to demonstrate various elements including text, lists, and images. 
      Use this template for testing your components or layouts.
    </p>
    <h2>Sample Headings</h2>
    <p>Below are some sample headings to test typography:</p>
    <h3>Heading Level 3</h3>
    <h4>Heading Level 4</h4>
    <h5>Heading Level 5</h5>
    <h2>Sample Paragraphs</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum sapien ut sem suscipit, at tristique libero sodales. 
      Fusce ut neque in nunc malesuada efficitur. Nullam vehicula ante ut purus scelerisque, vel faucibus ligula convallis.
    </p>
    <p>
      Suspendisse potenti. Proin quis lectus venenatis, scelerisque nisl sit amet, faucibus purus. Quisque feugiat risus nec nisi viverra, id vehicula sem tempus.
    </p>
    <h2>Sample Lists</h2>
    <div class="list">
      <h3>Ordered List</h3>
      <ol>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
      </ol>
      <h3>Unordered List</h3>
      <ul>
        <li>Item A</li>
        <li>Item B</li>
        <li>Item C</li>
      </ul>
    </div>
    <h2>Sample Images</h2>
    <div class="image-wrapper">
      <img src=${dumyimg1.src} alt="Sample Placeholder Image 1">
      <p>Image 1: A placeholder image</p>
    </div>
    <div class="image-wrapper">
      <img src=${dumyimg2.src} alt="Sample Placeholder Image 2">
      <p>Image 2: Another placeholder image</p>
    </div>
    <h2>Conclusion</h2>
    <p>
      This dummy HTML content should help you test various components like typography, image rendering, lists, and general layouts. Feel free to modify it as needed.
    </p>
  </div>
</body>
</html>
`;

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
          <div className={styles.container}>
            <div className={styles.verticalMargin}></div>
            <div className={styles.verticalMargin}>
              <Breadcrumb />
            </div>
          </div>
        </>
      );
    } else if (name.includes("blogContent")) {
      return (
        data?.[name as keyof PageData] && (
          <BlogInnerLaylout tags={allTags} categories={allCategories}>
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
