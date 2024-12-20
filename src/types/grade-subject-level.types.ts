export type PageData = {
  hero_section: {
    header: string;
    headerTag: string;
    paragraph: string;
    image: string;
    imageAltText: string;
  };
  hero_section_from: {
    header: string;
    headerTag: string;
    paragraph: string;
    image: string;
    imageAltText: string;
  };
  phone_cta: {
    header: string;
    headerTag: string;
    paragraph: string;
    buttonText: string;
    link: string;
  };
  demo_pointers: {
    header: string;
    headerTag: string;
    buttonText: string;
    buttonLink: string;
    demoPointersData: Demo_Pointers_Type[];
  };
  main_content: {
    header: string;
    headerTag: string;
    paragraph: string;
    subjects: Main_Content_Subject_Type[];
  };
  popular_subjects: {
    header: string;
    headerTag: string;
    image: string;
    imageAltText: string;
    subjects: Popular_Subjects_Type[];
  };
  education_counseling: {
    header: string;
    headerTag: string;
    paragraph: string;
  };
  what_our_student_says: {
    header: string;
    headerTag: string;
    paragraph: string;
  };
  blog_CTA: {
    header: string;
    headerTag: string;
    paragraph: string;
    buttonText: string;
    link: string;
  };
  Faqs: {
    header: string;
    headerTag: string;
    paragraph: string;

    faqs: Faqs_Type[];
  };
  slugData: string;
  variation: string;
  meta_tags: {
    title: string;
    description: string;
    canonicalTag: string;
    metaName: string[];
    ogTitle: string;
    ogImage: string;
    ogDescription: string;
    ogUrl: string;
    schema: string;
    pageSchemaDescription: string;
    pageSchemaName: string;
    serviceDescription: string;

    serviceType: string;
  };
};

export type Popular_Subjects_Type = {
  icon: string;
  link: string;
  name: string;
};
export type Demo_Pointers_Type = { body: string; header: string };
export type Main_Content_Subject_Type = { link: string; name: string };
export type Faqs_Type = { question: string; answer: string };

export type Section_Type = { name: string; placment: number };
export type Component_Sequence_Type = {
  sections: Section_Type[];
};
