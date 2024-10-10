import GradeSubjectLevel from "@/components/grade-subject-level/grade-subject-level";
import {
  getPageData,
  getPageSequence,
} from "@/services/grade-subject-level/grade-subject-level";
import {
  Component_Sequence_Type,
  PageData,
} from "@/types/grade-subject-level.types";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { slug: string } }) => {
  const [data, sequence]: [
    PageData | undefined | null,
    Component_Sequence_Type | undefined | null
  ] = await Promise.all([getPageData(params.slug), getPageSequence()]);

  if (!data) return redirect("/404");

  if (!sequence) {
    return <div>Error: Component sequence not found.</div>;
  }

  return <GradeSubjectLevel data={data} sequence={sequence} />;
};

export default Page;
