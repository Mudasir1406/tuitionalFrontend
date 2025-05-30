export interface tutor_section {
  headerTag: string;
  sequenceNumber: number;
  subject: string;
  curriculum: string;
  header: string;
  view: string;
  grade: string;
}

export type AllBlogsData = {
  heroSection: {
    header: string;
    headerTag: string;
    image: string;
    imageAltText: string;
    socialShare: boolean;
    category: { name: string; id: string }[];
    sequenceNumber: number;
  };
  timestamp: { seconds: number; nanoseconds: number };
  blogContent: {
    header: string;
    headerTag: string;
    content: string;
    sequenceNumber: number;
  };
  postCTA: {
    show: boolean;
    sequenceNumber: number;
  };
  relatedBlogs: {
    show: boolean;
  };
  blog_tag: {
    sequenceNumber: number;
    tags: Tags[];
  };
  id: string;
  slugData: string;
  variant: string;
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

type Tags = {
  id: string;
  name: string;
};
export type PageData = {
  link_list: {
    header: string;
    headerTag: string;
    paragraph: string;
    subjects: { name: string; link: string }[];
  };
  igcse_in_dubai: {
    header: string;
    headerTag: string;

    subTextRightTag: string;
    subTextRight: string;
    subTextLeft: string;
    subTextLeftTag: string;
    listArray: { name: string; paragraph: string }[];
  };
  tutoring_program: any;
  what_we_offer: {
    isShow: boolean;
  };
  get_started: {
    isShow: boolean;
  };
  postCTA: { isShow: boolean; sequenceNumber: number };
  hero_section: {
    header: string;
    headerTag: string;
    paragraph: string;
    image: string;
    imageAltText: string;
  };
  with_form: {
    header: string;
    headerTag: string;
    paragraph: string;
    image: string;
    imageAltText: string;
  };
  tutor_section: tutor_section;
  igcse_tutoring_program: {
    section: string;
    sectionTag: string;
    paragraph: string;
    isShow: boolean;
    buttonText: string;
    link: string;
  };
  timestamp: { seconds: number; nanoseconds: number };
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
    tags?: { name: string; link: string }[];
  };
  why_igsce: {
    header: string;
    headerTag: string;
    paragraph: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    imageAltText: string;
    section: string;
    sectionTag: string;
    right_to_left: boolean;
    focusArea: string;
    subjects?: { name: string; link: string }[];
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
  variant: string;
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
