# Components Catalogue

Index of every component in `tuitionalFrontend\src\components\`. Each row links to its per-component spec. The spec contains the **exact MUI properties** (font sizes, spacing, colors, animations, responsive breakpoints) plus the bug list versus the current Tailwind port.

If you're touching a component, **read its spec first**. Don't write classes by feel — look up the MUI source line and translate via [01-token-mapping.md](./01-token-mapping.md).

> **Conventions**
> - Each `.md` file documents one LTR component. AR variants (`ar-*`, `Ar-*`) are noted inline in the main spec unless the layout differs substantially.
> - Component files use the legacy spellings of their MUI counterparts (e.g. `form-dialouge.tsx`, `why-igsce.tsx`) — don't rename.
> - Components with v1 + v2 variants get separate specs (e.g. `hero.md` and `hero-v2.md`).

---

## About — `components/about/`

| Component | Spec | MUI source |
|---|---|---|
| AboutUs | [components/about/about-us.md](./components/about/about-us.md) | `src/components/about/about-us.tsx` |
| HeroInfo | [components/about/hero-info.md](./components/about/hero-info.md) | `src/components/about/hero-info.tsx` |
| Hero | [components/about/hero.md](./components/about/hero.md) | `src/components/about/hero/hero.tsx` |
| WhyChooseTuitional | [components/about/why-choose-tuitional.md](./components/about/why-choose-tuitional.md) | `src/components/about/why-choose-tuitional.tsx` |

## Blog — `components/blog/`

| Component | Spec | MUI source |
|---|---|---|
| Accordion | [components/blog/accordion.md](./components/blog/accordion.md) | `src/components/blog/accordion/Accordion.tsx` |
| AllBlogs | [components/blog/all-blogs.md](./components/blog/all-blogs.md) | `src/components/blog/all-blogs/All-Blogs.tsx` |
| BlogAuthorProfile | [components/blog/author-profile.md](./components/blog/author-profile.md) | `src/components/blog/author-profile/BlogAuthorProfile.tsx` |
| AuthorSocial | [components/blog/author-social.md](./components/blog/author-social.md) | `src/components/blog/author-social/AuthorSocial.tsx` |
| BlogCard | [components/blog/blog-card.md](./components/blog/blog-card.md) | `src/components/blog/blog-card/BlogCard.tsx` |
| BlogSequences | [components/blog/blog-sequences.md](./components/blog/blog-sequences.md) | `src/components/blog/blogSequences/blog-sequences.tsx` |
| ConducuveEnviroment (sic) | [components/blog/conducive-enviroment.md](./components/blog/conducive-enviroment.md) | `src/components/blog/conducive-enviroment.tsx` |
| Embrace | [components/blog/embrace.md](./components/blog/embrace.md) | `src/components/blog/embrace.tsx` |
| Hero (blog index) | [components/blog/hero.md](./components/blog/hero.md) | `src/components/blog/hero/Hero.tsx` |
| Hero (blog detail / nested) | [components/blog/hero-nested.md](./components/blog/hero-nested.md) | `src/components/blog/hero-nested/Hero.tsx` |
| BlogSidebarForm | [components/blog/blog-sidebar-form.md](./components/blog/blog-sidebar-form.md) | `src/components/blog/left-section/BlogSidebarForm.tsx` |
| LeftSection (blog sidebar) | [components/blog/left-section.md](./components/blog/left-section.md) | `src/components/blog/left-section/left-section.tsx` |
| OptionsImageHome | [components/blog/options-image-home.md](./components/blog/options-image-home.md) | `src/components/blog/options-image-home.tsx` |
| PostCTA | [components/blog/post-cta.md](./components/blog/post-cta.md) | `src/components/blog/postCTA/PostCTA.tsx` |
| RelatedBlogs | [components/blog/related-blogs.md](./components/blog/related-blogs.md) | `src/components/blog/relatedBlogs/RelatedBlogs.tsx` |
| SearchBar | [components/blog/search-bar.md](./components/blog/search-bar.md) | `src/components/blog/search-bar/SearchBar.tsx` |
| TagsAndSocial | [components/blog/tags-and-social.md](./components/blog/tags-and-social.md) | `src/components/blog/tags-social/TagsAndSocial.tsx` |

## Careers — `components/careers/`

| Component | Spec | MUI source |
|---|---|---|
| ApplyNow | [components/careers/apply-now.md](./components/careers/apply-now.md) | `src/components/careers/apply-now.tsx` |
| Hero | [components/careers/hero.md](./components/careers/hero.md) | `src/components/careers/hero.tsx` |
| HeroInfo | [components/careers/hero-info.md](./components/careers/hero-info.md) | `src/components/careers/hero-info.tsx` |
| TeamValues | [components/careers/team-values.md](./components/careers/team-values.md) | `src/components/careers/team-values.tsx` |
| TopTalent | [components/careers/top-talent.md](./components/careers/top-talent.md) | `src/components/careers/top-talent.tsx` |

## Contact — `components/contact/`

| Component | Spec | MUI source |
|---|---|---|
| GetInTouch | [components/contact/get-in-touch.md](./components/contact/get-in-touch.md) | `src/components/contact/get-in-touch/GetInTouch.tsx` |
| Info | [components/contact/info.md](./components/contact/info.md) | `src/components/contact/info.tsx` |
| LearnTogeather (sic) | [components/contact/learn-togeather.md](./components/contact/learn-togeather.md) | `src/components/contact/learn-togeather.tsx` |

## Curriculum (curiculume — sic) — `components/curiculume/`

| Component | Spec | MUI source |
|---|---|---|
| Hero | [components/curiculume/hero.md](./components/curiculume/hero.md) | `src/components/curiculume/hero.tsx` |
| Offer | [components/curiculume/offer.md](./components/curiculume/offer.md) | `src/components/curiculume/offer.tsx` |
| CAIE | [components/curiculume/caie.md](./components/curiculume/caie.md) | `src/components/curiculume/caie.tsx` |
| PopularIgcseSubjects | [components/curiculume/popular-igcse-subjects.md](./components/curiculume/popular-igcse-subjects.md) | `src/components/curiculume/popular-igcse-subjects.tsx` |
| PopularIgcseSubjectsV2 | [components/curiculume/popular-igcse-subjects-v2.md](./components/curiculume/popular-igcse-subjects-v2.md) | `src/components/curiculume/popular-igcse-subjects-v2.tsx` |
| Pricing | [components/curiculume/pricing.md](./components/curiculume/pricing.md) | `src/components/curiculume/pricing.tsx` |
| GradingScale | [components/curiculume/grading-scale.md](./components/curiculume/grading-scale.md) | `src/components/curiculume/grading-scale.tsx` |
| FeaturesOfTuitionals | [components/curiculume/features-of-tuitionals.md](./components/curiculume/features-of-tuitionals.md) | `src/components/curiculume/features-of-tuitionals.tsx` |
| AssessmentObjective | [components/curiculume/assessment-objective.md](./components/curiculume/assessment-objective.md) | `src/components/curiculume/assessment-objective.tsx` |
| JoinUs | [components/curiculume/join-us.md](./components/curiculume/join-us.md) | `src/components/curiculume/join-us.tsx` |
| Faqs | [components/curiculume/faqs.md](./components/curiculume/faqs.md) | `src/components/curiculume/faqs.tsx` |
| EducationalCounseling | [components/curiculume/educational-counseling.md](./components/curiculume/educational-counseling.md) | `src/components/curiculume/educational-counseling.tsx` |
| WhyChoose | [components/curiculume/why-choose.md](./components/curiculume/why-choose.md) | `src/components/curiculume/why-choose.tsx` |

## Grade-Subject-Level — `components/grade-subject-level/`

| Component | Spec | MUI source |
|---|---|---|
| GradeSubjectLevel | [components/grade-subject-level/grade-subject-level.md](./components/grade-subject-level/grade-subject-level.md) | `src/components/grade-subject-level/grade-subject-level.tsx` |
| GradeSubjectLevelV2 | [components/grade-subject-level/grade-subject-level-v2.md](./components/grade-subject-level/grade-subject-level-v2.md) | `src/components/grade-subject-level/grade-subject-level-v2.tsx` |
| Hero | [components/grade-subject-level/hero.md](./components/grade-subject-level/hero.md) | `src/components/grade-subject-level/hero.tsx` |
| HeroV2 | [components/grade-subject-level/hero-v2.md](./components/grade-subject-level/hero-v2.md) | `src/components/grade-subject-level/heroV2.tsx` |
| HeroInfo | [components/grade-subject-level/hero-info.md](./components/grade-subject-level/hero-info.md) | `src/components/grade-subject-level/hero-info.tsx` |
| PhoneCta | [components/grade-subject-level/phone-cta.md](./components/grade-subject-level/phone-cta.md) | `src/components/grade-subject-level/phone-cta.tsx` |
| SectionsBox | [components/grade-subject-level/sectionsbox.md](./components/grade-subject-level/sectionsbox.md) | `src/components/grade-subject-level/sectionsbox.tsx` |
| SectionsBoxV2 | [components/grade-subject-level/sectionsbox-v2.md](./components/grade-subject-level/sectionsbox-v2.md) | `src/components/grade-subject-level/sectionsboxV2.tsx` |
| StudentsSays | [components/grade-subject-level/students-says.md](./components/grade-subject-level/students-says.md) | `src/components/grade-subject-level/students-says.tsx` |
| StudentsSaysV2 | [components/grade-subject-level/students-says-v2.md](./components/grade-subject-level/students-says-v2.md) | `src/components/grade-subject-level/students-says-v2.tsx` |
| GetStarted | [components/grade-subject-level/get-started.md](./components/grade-subject-level/get-started.md) | `src/components/grade-subject-level/get-started.tsx` |
| GetStartedV2 | [components/grade-subject-level/get-started-v2.md](./components/grade-subject-level/get-started-v2.md) | `src/components/grade-subject-level/get-started-v2.tsx` |
| Faqs | [components/grade-subject-level/faqs.md](./components/grade-subject-level/faqs.md) | `src/components/grade-subject-level/faqs.tsx` |
| BlogCta | [components/grade-subject-level/blog-cta.md](./components/grade-subject-level/blog-cta.md) | `src/components/grade-subject-level/blog-cta.tsx` |
| DemoPointers | [components/grade-subject-level/demo-pointers.md](./components/grade-subject-level/demo-pointers.md) | `src/components/grade-subject-level/demo-pointers.tsx` |
| FoundPage (404 helper) | [components/grade-subject-level/found-page.md](./components/grade-subject-level/found-page.md) | `src/components/grade-subject-level/found-page.tsx` |
| MainContent | [components/grade-subject-level/main-content.md](./components/grade-subject-level/main-content.md) | `src/components/grade-subject-level/main-content.tsx` |
| Form | [components/grade-subject-level/form.md](./components/grade-subject-level/form.md) | `src/components/grade-subject-level/form/form.tsx` |
| FormV2 | [components/grade-subject-level/form-v2.md](./components/grade-subject-level/form-v2.md) | `src/components/grade-subject-level/form/formV2.tsx` |
| FormV2Dialog | [components/grade-subject-level/form-v2-dialog.md](./components/grade-subject-level/form-v2-dialog.md) | `src/components/grade-subject-level/form/formV2Dialog.tsx` |
| BenifitsSection (sic) | [components/grade-subject-level/benifits-section.md](./components/grade-subject-level/benifits-section.md) | `src/components/grade-subject-level/benifts-section/BenifitsSection.tsx` |
| BenifitsSectionV2 | [components/grade-subject-level/benifits-section-v2.md](./components/grade-subject-level/benifits-section-v2.md) | `src/components/grade-subject-level/benifts-section/BenifitsSectionV2.tsx` |
| BenifitsOfStudyingSection | [components/grade-subject-level/benifits-of-studying-section.md](./components/grade-subject-level/benifits-of-studying-section.md) | `src/components/grade-subject-level/benifts-of-studying-section/BenifitsOfStudyingSection.tsx` |
| TutorSection | [components/grade-subject-level/tutor-section.md](./components/grade-subject-level/tutor-section.md) | `src/components/grade-subject-level/tutor-section/TutorSection.tsx` |
| TutorSectionV2 | [components/grade-subject-level/tutor-section-v2.md](./components/grade-subject-level/tutor-section-v2.md) | `src/components/grade-subject-level/tutor-section/TutorSectionV2.tsx` |
| TutorGridView | [components/grade-subject-level/tutor-grid-view.md](./components/grade-subject-level/tutor-grid-view.md) | `src/components/grade-subject-level/tutor-section/grid-view/GridView.tsx` |
| TutorListView | [components/grade-subject-level/tutor-list-view.md](./components/grade-subject-level/tutor-list-view.md) | `src/components/grade-subject-level/tutor-section/list-view/ListView.tsx` |
| HorizontalTutorCarousel | [components/grade-subject-level/horizontal-tutor-carousel.md](./components/grade-subject-level/horizontal-tutor-carousel.md) | `src/components/grade-subject-level/tutor-section/horizontal-carousel/HorizontalTutorCarousel.tsx` |
| FlagIcon | [components/grade-subject-level/flag-icon.md](./components/grade-subject-level/flag-icon.md) | `src/components/grade-subject-level/tutor-section/horizontal-carousel/FlagIcon.tsx` |
| SchoolLogosSection | [components/grade-subject-level/school-logos-section.md](./components/grade-subject-level/school-logos-section.md) | `src/components/grade-subject-level/school-logos-section/SchoolLogosSection.tsx` |
| TutoringProgramSection | [components/grade-subject-level/tutoring-program-section.md](./components/grade-subject-level/tutoring-program-section.md) | `src/components/grade-subject-level/tutoring-program-section/TutoringProgramSection.tsx` |
| LinkListViewSection | [components/grade-subject-level/link-list-view-section.md](./components/grade-subject-level/link-list-view-section.md) | `src/components/grade-subject-level/link-list-view/LinkListViewSection.tsx` |

## Home — `components/home/`

| Component | Spec | MUI source |
|---|---|---|
| ContactUs | [components/home/contact-us.md](./components/home/contact-us.md) | `src/components/home/contact-us.tsx` |
| Faqs | [components/home/faqs.md](./components/home/faqs.md) | `src/components/home/faqs.tsx` |
| Filter | [components/home/filter.md](./components/home/filter.md) | `src/components/home/filter.tsx` |
| FormDialouge (sic — dialog) | [components/home/form-dialouge.md](./components/home/form-dialouge.md) | `src/components/home/form-dialouge.tsx` |
| FormDialougeV1 | [components/home/form-dialouge-v1.md](./components/home/form-dialouge-v1.md) | `src/components/home/form-dialouge-v1.tsx` |
| GetStarted | [components/home/get-started.md](./components/home/get-started.md) | `src/components/home/get-started.tsx` |
| Info (stat block) | [components/home/info.md](./components/home/info.md) | `src/components/home/info.tsx` |
| OurClient | [components/home/our-client.md](./components/home/our-client.md) | `src/components/home/our-client.tsx` |
| PopularSearches | [components/home/popular-searches.md](./components/home/popular-searches.md) | `src/components/home/popular-searches.tsx` |
| Questions | [components/home/questions.md](./components/home/questions.md) | `src/components/home/questions.tsx` |
| Trusted | [components/home/trusted.md](./components/home/trusted.md) | `src/components/home/trusted.tsx` |
| TutorModal | [components/home/tutor-modal.md](./components/home/tutor-modal.md) | `src/components/home/tutor-modal.tsx` |

## Main Curriculum — `components/maincuriculume/`

| Component | Spec | MUI source |
|---|---|---|
| Hero | [components/maincuriculume/hero.md](./components/maincuriculume/hero.md) | `src/components/maincuriculume/hero.tsx` |
| CurriculumOverview | [components/maincuriculume/curriculum-overview.md](./components/maincuriculume/curriculum-overview.md) | `src/components/maincuriculume/curriculum-overview.tsx` |
| DetailedCurriculum | [components/maincuriculume/detailed-curriculum.md](./components/maincuriculume/detailed-curriculum.md) | `src/components/maincuriculume/detailed-curriculum.tsx` |
| Benifits (sic) | [components/maincuriculume/benifits.md](./components/maincuriculume/benifits.md) | `src/components/maincuriculume/benifits.tsx` |
| StudentsSay | [components/maincuriculume/students-say.md](./components/maincuriculume/students-say.md) | `src/components/maincuriculume/students-say.tsx` |
| JoinUs | [components/maincuriculume/join-us.md](./components/maincuriculume/join-us.md) | `src/components/maincuriculume/joinus.tsx` |

## Pricing — `components/pricing/`

| Component | Spec | MUI source |
|---|---|---|
| CountrySelector | [components/pricing/country-selector.md](./components/pricing/country-selector.md) | `src/components/pricing/CountrySelector.tsx` |
| CustomPackageCard | [components/pricing/custom-package-card.md](./components/pricing/custom-package-card.md) | `src/components/pricing/CustomPackageCard.tsx` |
| CustomPricingCard | [components/pricing/custom-pricing-card.md](./components/pricing/custom-pricing-card.md) | `src/components/pricing/CustomPricingCard.tsx` |
| CustomPricingModal | [components/pricing/custom-pricing-modal.md](./components/pricing/custom-pricing-modal.md) | `src/components/pricing/CustomPricingModal.tsx` |
| PackageCard | [components/pricing/package-card.md](./components/pricing/package-card.md) | `src/components/pricing/PackageCard.tsx` |
| PricingFilter | [components/pricing/pricing-filter.md](./components/pricing/pricing-filter.md) | `src/components/pricing/PricingFilter.tsx` |
| PricingPageClient | [components/pricing/pricing-page-client.md](./components/pricing/pricing-page-client.md) | `src/components/pricing/PricingPageClient.tsx` |
| PricingSection | [components/pricing/pricing-section.md](./components/pricing/pricing-section.md) | `src/components/pricing/PricingSection.tsx` |
| SimplePackageModal | [components/pricing/simple-package-modal.md](./components/pricing/simple-package-modal.md) | `src/components/pricing/SimplePackageModal.tsx` |

## Testimonials — `components/testimonials/`

| Component | Spec | MUI source |
|---|---|---|
| Hero | [components/testimonials/hero.md](./components/testimonials/hero.md) | `src/components/testimonials/hero.tsx` |
| HeroInfo | [components/testimonials/hero-info.md](./components/testimonials/hero-info.md) | `src/components/testimonials/hero-info.tsx` |
| ReviewsOnSP | [components/testimonials/reviews-on-sp.md](./components/testimonials/reviews-on-sp.md) | `src/components/testimonials/reviews-on-sp.tsx` |
| ReviewsOnWP | [components/testimonials/reviews-on-wp.md](./components/testimonials/reviews-on-wp.md) | `src/components/testimonials/reviews-on-wp.tsx` |
| VideoBasedReviews | [components/testimonials/video-based-reviews.md](./components/testimonials/video-based-reviews.md) | `src/components/testimonials/video-based-reviews.tsx` |
| WaveForm | [components/testimonials/wave-form.md](./components/testimonials/wave-form.md) | `src/components/testimonials/wave-form.tsx` |

## Shared (root-level) — `components/shared/`

| Component | Spec | MUI source |
|---|---|---|
| Header (v1) | [components/shared/header.md](./components/shared/header.md) | `src/components/header.tsx` |
| HeaderV2 | [components/shared/header-v2.md](./components/shared/header-v2.md) | `src/components/header-v2.tsx` |
| HeaderV3 | [components/shared/header-v3.md](./components/shared/header-v3.md) | `src/components/header-v3.tsx` |
| Footer | [components/shared/footer.md](./components/shared/footer.md) | `src/components/footer.tsx` |
| FooterV2 | [components/shared/footer-v2.md](./components/shared/footer-v2.md) | `src/components/footerV2.tsx` |
| FooterWrapper | [components/shared/footer-wrapper.md](./components/shared/footer-wrapper.md) | `src/components/footer-wrapper.tsx` |
| ServerFooter | [components/shared/server-footer.md](./components/shared/server-footer.md) | `src/components/server-footer.tsx` |
| Drawer | [components/shared/drawer.md](./components/shared/drawer.md) | `src/components/drawer.tsx` |
| HtmlWrapper | [components/shared/html-wrapper.md](./components/shared/html-wrapper.md) | `src/components/html-wrapper.tsx` |
| LanguageSwitcher | [components/shared/language-switcher.md](./components/shared/language-switcher.md) | `src/components/language-switcher.tsx` |
| RouteLanguageSwitcher | [components/shared/route-language-switcher.md](./components/shared/route-language-switcher.md) | `src/components/route-language-switcher.tsx` |
| LineBreakText | [components/shared/line-break-text.md](./components/shared/line-break-text.md) | `src/components/line-break-text.tsx` |
| PopUpButton | [components/shared/pop-up-button.md](./components/shared/pop-up-button.md) | `src/components/pop-up-button.tsx` |
| PopUpButtonV2 | [components/shared/pop-up-button-v2.md](./components/shared/pop-up-button-v2.md) | `src/components/pop-up-buttonV2.tsx` |

## Utility — `components/utility/`

| Component | Spec | MUI source |
|---|---|---|
| DropDown | [components/utility/dropdown.md](./components/utility/dropdown.md) | `src/components/DropDown/DropDown.tsx` |
| TranslatableDropDown | [components/utility/translatable-dropdown.md](./components/utility/translatable-dropdown.md) | `src/components/DropDown/TranslatableDropDown.tsx` |
| CustomInput | [components/utility/custom-input.md](./components/utility/custom-input.md) | `src/components/custom-input/custom-input.tsx` |
| Input | [components/utility/input.md](./components/utility/input.md) | `src/components/input/Input.tsx` |
| TextArea | [components/utility/textarea.md](./components/utility/textarea.md) | `src/components/textArea/TextArea.tsx` |
| Tag | [components/utility/tag.md](./components/utility/tag.md) | `src/components/tag/Tag.tsx` |
| TagArabic | [components/utility/tag-arabic.md](./components/utility/tag-arabic.md) | `src/components/ar-tags/Ar-Tag.tsx` |
| TeacherCard | [components/utility/teacher-card.md](./components/utility/teacher-card.md) | `src/components/teacher-card/TeacherCard.tsx` |
| ImageCard | [components/utility/image-card.md](./components/utility/image-card.md) | `src/components/image-card/ImageCard.tsx` |
| BreadCrumb | [components/utility/bread-crumb.md](./components/utility/bread-crumb.md) | `src/components/bread-crumb/bread-crumb.tsx` |
| CountdownTimer | [components/utility/countdown.md](./components/utility/countdown.md) | `src/components/countdown/CountdownTimer.tsx` |
| TrustpilotCarousel | [components/utility/trustpilot-carousel.md](./components/utility/trustpilot-carousel.md) | `src/components/trustpilot-carousel/TrustpilotCarousel.tsx` |
| TrustpilotReview | [components/utility/trustpilot-review.md](./components/utility/trustpilot-review.md) | `src/components/trustpilot-review/TrustpilotReview.tsx` |
| FooterLinks | [components/utility/footer-links.md](./components/utility/footer-links.md) | `src/components/footerLinks/FooterLinks.tsx` |
| UniversalSchema (SEO) | [components/utility/seo-universal-schema.md](./components/utility/seo-universal-schema.md) | `src/components/seo/UniversalSchema.tsx` |

---

## How to use this catalogue

1. Open the component you need to fix in the Tailwind project (e.g. `tuitionalFrontend/src/components/contact/get-in-touch/GetInTouch.tsx`).
2. Find its row in this catalogue.
3. Open its spec file. Read §1 (MUI properties) and §2 (bug list).
4. Apply §3 (corrected classNames).
5. Verify per §4 (4 reference widths) — and run through the 20-device matrix in [03-responsiveness.md](./03-responsiveness.md).

Specs are write-once, fix-many: when the component changes in the Tailwind side, you can re-verify against the spec; when the MUI baseline changes (rare), update the spec.
