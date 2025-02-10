import GradeSubjectLevel from "@/components/grade-subject-level/grade-subject-level";
import GradeSubjectLevelV2 from "@/components/grade-subject-level/grade-subject-level-v2";
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

  // console.log("Pagelevel", data);

  const sortJsonObjectBySequenceNumber = (jsonObject: {
    [key: string]: any;
  }): { [key: string]: any } => {
    // Convert the object to an array of key-value pairs
    const entries = Object.entries(jsonObject);

    // Sort the entries:
    const sortedEntries = entries.sort(([, valueA], [, valueB]) => {
      const seqA = valueA.sequenceNumber ?? Infinity; // If sequenceNumber is missing, assign Infinity
      const seqB = valueB.sequenceNumber ?? Infinity; // If sequenceNumber is missing, assign Infinity
      return seqA - seqB;
    });

    // Convert the sorted entries back into an object
    return Object.fromEntries(sortedEntries);
  };

  if (!data) return redirect("/404");

  if (!sequence) {
    return <div>Error: Component sequence not found.</div>;
  }

  if (data?.variant == "new") {
    return (
      <GradeSubjectLevelV2 data={sortJsonObjectBySequenceNumber(data) as any} />
    );
  }

  return <GradeSubjectLevel data={data} sequence={sequence} />;
};

export default Page;
