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
const BlogAuthorProfile = dynamic(() => import("../author-profile/BlogAuthorProfile"), { ssr: true });

type IProps = {
  data: PageData;
  allBlogs: AllBlogsData[] | null | undefined;
  allTags: { name: { en: string; ar: string }; id: string }[];
  allCategories: { name: { en: string; ar: string }; id: string }[];
};

type TocItem = { id: string; text: string };

const processHtmlContent = (html: string): { html: string; tocItems: TocItem[] } => {
  const $ = cheerio.load(html);
  $(".ql-ui").remove();
  $("ol").each(function () {
    const $list = $(this);
    if ($list.find("li[data-list='bullet']").length > 0) {
      $list.replaceWith($("<ul>").append($list.contents()));
    }
  });
  $("li[data-list]").removeAttr("data-list");

  const tocItems: TocItem[] = [];
  $("h2").each(function (i) {
    const text = $(this).text().trim();
    if (text) {
      const id = `toc-${i}`;
      $(this).attr("id", id);
      tocItems.push({ id, text });
    }
  });

  return { html: $.html(), tocItems };
};

const TableOfContents = ({ items }: { items: TocItem[] }) => {
  if (!items.length) return null;
  return (
    <nav className="mb-6 w-full overflow-hidden rounded-lg border border-brand-100 bg-brand-50 p-4">
      <p className="mb-3 font-heading text-h6 font-bold text-ink-900">Table of Contents</p>
      <ol className="list-decimal space-y-1 ps-5">
        {items.map((item) => (
          <li key={item.id} className="min-w-0 font-body text-body-mobile sm:text-body">
            <a
              href={`#${item.id}`}
              className="block break-words text-brand-500 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const BlogSequences: React.FC<IProps> = ({ data, allBlogs, allTags, allCategories }) => {
  const entries = Object.entries(data);
  const authorProfileData = (data as any)?.authorProfile;

  // Pre-process all blogContent sections — extract TOC and stamp heading IDs
  const processedContents = new Map<string, { html: string; tocItems: TocItem[] }>();
  entries.forEach(([key]) => {
    if (key.trim().includes("blogContent")) {
      const raw = (data?.[key as keyof PageData] as any)?.content ?? "";
      processedContents.set(key.trim(), processHtmlContent(raw));
    }
  });
  const allTocItems = Array.from(processedContents.values()).flatMap((v) => v.tocItems);

  const renderContent = (name: string) => {
    if (name.includes("blogContent")) {
      const processed = processedContents.get(name);
      return (
        data?.[name as keyof PageData] && processed && (
          <div className="mb-[5vh]">
            <TableOfContents items={allTocItems} />
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: processed.html }} />
          </div>
        )
      );
    }
    if (name.includes("authorProfile")) return null;
    if (name.includes("Faqs")) {
      return (
        data?.[name as keyof PageData] && (
          <div className="mb-[5vh]">
            <FrequentlyQuestions data={data?.[name as keyof PageData]} />
          </div>
        )
      );
    }
    if (name.includes("postCTA")) {
      return (
        (data?.[name as keyof PageData] as any)?.isShow && (
          <div className="mb-[5vh]">
            <PostCTA />
          </div>
        )
      );
    }
    return null;
  };

  const contentSections = (
    <>
      {entries
        .filter(([key]) => !key.trim().includes("heroSection"))
        .map(([key]) => (
          <div key={key}>{renderContent(key.trim())}</div>
        ))}
      {authorProfileData?.authorName && (
        <div className="mb-[5vh]">
          <BlogAuthorProfile data={authorProfileData} />
        </div>
      )}
      {allBlogs && allBlogs.length > 0 && (
        <div className="mb-[5vh]">
          <RelatedBlogs blogs={allBlogs} />
        </div>
      )}
    </>
  );

  return (
    <>
      <Header heroClassName="h-[150px] sm:h-[130px] lg:h-[110px] bg-[#d6f0ff]" />

      {/* Full-width hero section */}
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
                <div className="relative mx-auto h-[25vh] w-[90%] overflow-hidden rounded-lg sm:h-[35vh] lg:h-[70vh]">
                  <Image
                    src={sectionData.image}
                    alt={sectionData?.imageAltText || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="px-[5vw]">
                <div className="my-[7vh]">
                  <Breadcrumb />
                </div>
              </div>
            </div>
          );
        })}

      {/* Desktop: fixed-height container — content scrolls internally, form stays static.
          When content col hits bottom, scroll chains to the page and footer becomes reachable. */}
      <div
        className="hidden lg:flex gap-[3%] overflow-hidden px-[5vw]"
        style={{ height: "calc(100vh - 2vh - 80px)" }}
      >
        {/* Form sidebar — no scroll, stays put (LEFT) */}
        <div className="w-[22%] shrink-0 overflow-hidden pt-[3vh]">
          <LeftSection tags={allTags} categories={allCategories} />
        </div>
        {/* Content column — internal scroll only (RIGHT) */}
        <div className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto py-[3vh] pb-[5vh] [scrollbar-width:thin] [scrollbar-color:#d0d0d0_transparent]">
          {contentSections}
        </div>
      </div>

      {/* Mobile / tablet: normal page scroll, no sidebar */}
      <div className="w-full overflow-x-hidden px-[4vw] py-[3vh] lg:hidden">
        {contentSections}
      </div>

      <ServerFooter />
    </>
  );
};

export default BlogSequences;
