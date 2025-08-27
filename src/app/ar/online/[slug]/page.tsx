import ArGradeSubjectLevel from "@/components/grade-subject-level/ar-grade-subject-level";
import ArGradeSubjectLevelV2 from "@/components/grade-subject-level/ar-grade-subject-level-v2";
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

interface PageProps {
  params: { slug: string };
}

const ArOnlineSlugPage = async ({ params }: PageProps) => {
  // Fetch Arabic data by passing locale parameter
  const [data, sequence]: [
    PageData | undefined | null,
    Component_Sequence_Type | undefined | null
  ] = await Promise.all([
    getPageData(params.slug, "ar"), // Pass Arabic locale
    getPageSequence()
  ]);

  // Helper function to sort components by sequence number (for V2 layout)
  const sortJsonObjectBySequenceNumber = (jsonObject: {
    [key: string]: any;
  }): { [key: string]: any } => {
    const entries = Object.entries(jsonObject);
    const sortedEntries = entries.sort(([, valueA], [, valueB]) => {
      const seqA = valueA.sequenceNumber ?? Infinity;
      const seqB = valueB.sequenceNumber ?? Infinity;
      return seqA - seqB;
    });
    return Object.fromEntries(sortedEntries);
  };

  // Redirect to 404 if no data found
  if (!data) return redirect("/404");

  if (!sequence) {
    return <div>خطأ: لم يتم العثور على ترتيب المكونات.</div>;
  }

  // Use V2 layout if variant is "new", otherwise use V1
  if (data?.variant === "new") {
    return (
      <ArGradeSubjectLevelV2 data={sortJsonObjectBySequenceNumber(data) as any} />
    );
  }

  return <ArGradeSubjectLevel data={data} sequence={sequence} />;
};

export default ArOnlineSlugPage;