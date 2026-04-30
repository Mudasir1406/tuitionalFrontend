"use client";

import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

import { Container } from "@/components/ui/container";
import useGeoLocation from "@/utils/slugHelper";
import { mapApiCountryToPricing, SUPPORTED_COUNTRIES } from "@/utils/pricing-helpers";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";

const ArPricingSection = dynamic(() => import("./ArPricingSection"), {
  ssr: true,
  loading: () => (
    <Container size="lg">
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="font-heading text-body text-ink-700">جاري تحميل الباقات...</p>
      </div>
    </Container>
  ),
});

const ArTrustSection = React.lazy(() =>
  Promise.resolve({
    default: () => (
      <section className="bg-brand-50 py-16" dir="rtl">
        <Container size="lg">
          <div className="text-center">
            <h3 className="font-heading text-h3 text-ink-900">موثوق من قبل الطلاب حول العالم</h3>
            <p className="mt-2 font-heading text-body text-ink-700">
              انضم إلى آلاف الطلاب الناجحين الذين حققوا أهدافهم الأكاديمية مع خبراء التدريس لدينا
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: "🎓", number: "10,000+", label: "طالب تم تدريسهم", progress: 90 },
              { icon: "👨‍🏫", number: "500+", label: "مدرس خبير", progress: 85 },
              { icon: "📚", number: "15+", label: "منهج مدعوم", progress: 75 },
              { icon: "⭐", number: "98%", label: "رضا الطلاب", progress: 98 },
            ].map((stat, i) => (
              <div key={i} className="rounded-lg bg-white p-6 text-center shadow-card">
                <div className="text-4xl">{stat.icon}</div>
                <p className="mt-2 font-heading text-h3 font-bold text-brand-500">{stat.number}</p>
                <p className="font-heading text-small text-ink-700">{stat.label}</p>
                <div className="mt-3 h-1 rounded-full bg-ink-200">
                  <div className="h-1 rounded-full bg-brand-500" style={{ width: `${stat.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              { icon: "🏆", text: "منصة عالية التقييم" },
              { icon: "🌟", text: "حائزة على جوائز" },
              { icon: "🔒", text: "آمنة وموثوقة" },
              { icon: "💯", text: "نتائج مضمونة" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card">
                <span>{badge.icon}</span>
                <span className="font-heading text-small font-semibold text-ink-900">{badge.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    ),
  }),
);

interface ArPricingPageClientProps {
  initialFilters: {
    grade?: string;
    subject?: string;
    curriculum?: string;
    country: string;
  };
  dropdownOptions: DropdownOptions;
  locale?: string;
}

const ArPricingPageClient: React.FC<ArPricingPageClientProps> = memo(
  ({ initialFilters, dropdownOptions, locale = "ar" }) => {
    const [filters, setFilters] = useState(initialFilters);
    const geoData = useGeoLocation();

    useEffect(() => {
      if (!geoData.isLoading && !geoData.error && geoData.country) {
        const mappedCountry = mapApiCountryToPricing(geoData.country);
        const isSupported = SUPPORTED_COUNTRIES.some(
          (c) => c.code === mappedCountry || c.name === mappedCountry || c.dbKey === mappedCountry,
        );
        const finalCountry = isSupported ? mappedCountry : "USA";
        if (finalCountry !== filters.country) {
          setFilters((prev) => ({ ...prev, country: finalCountry }));
        }
      }
    }, [geoData, filters.country]);

    return (
      <>
        <section className="bg-gradient-to-br from-brand-50 to-white py-20" dir="rtl">
          <Container size="lg">
            <div className="text-center">
              <h1 className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900">
                اعثر على باقة التدريس المثالية لك
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-heading text-body text-ink-700">
                تدريس متخصص مصمم حسب منهجك ومستواك الدراسي وأهدافك التعليمية. انضم إلى آلاف الطلاب الذين يحققون التفوق الأكاديمي من خلال نهجنا الشخصي.
              </p>
            </div>
          </Container>
        </section>

        <ArPricingSection filters={filters} dropdownOptions={dropdownOptions} locale={locale} />

        <React.Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center bg-ink-50">
              <p className="font-heading text-body text-ink-700">جاري تحميل التوصيات...</p>
            </div>
          }
        >
          <ArTrustSection />
        </React.Suspense>
      </>
    );
  },
);

ArPricingPageClient.displayName = "ArPricingPageClient";

export default ArPricingPageClient;
