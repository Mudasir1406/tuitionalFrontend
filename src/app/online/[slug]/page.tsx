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
  // Fetch data concurrently for better performance
  const [data, sequence]: [
    PageData | undefined,
    Component_Sequence_Type | undefined
  ] = await Promise.all([getPageData(params.slug), getPageSequence()]);

  // Redirect if data is not found
  if (!data) return redirect("/404");

  // If sequence is not found, consider what you want to do (optional)
  // You may want to return a loading state or an error message
  if (!sequence) {
    return <div>Error: Component sequence not found.</div>; // or a loading state, etc.
  }

  // Render the main component with the fetched data
  return <GradeSubjectLevel data={data} sequence={sequence} />;
};

export default Page;
