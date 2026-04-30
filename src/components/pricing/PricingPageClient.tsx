"use client";

import React, { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";

import { Container } from "@/components/ui/container";
import useGeoLocation from "@/utils/slugHelper";
import { mapApiCountryToPricing, SUPPORTED_COUNTRIES } from "@/utils/pricing-helpers";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";

const PricingSection = dynamic(() => import("./PricingSection"), {
  ssr: true,
  loading: () => (
    <Container size="lg">
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="font-heading text-body text-ink-700">Loading packages...</p>
      </div>
    </Container>
  ),
});

const TrustSection = React.lazy(() =>
  Promise.resolve({
    default: () => (
      <section className="bg-brand-50 py-16">
        <Container size="lg">
          <div className="text-center">
            <h3 className="font-heading text-h3 text-ink-900">Trusted by Students Worldwide</h3>
            <p className="mt-2 font-heading text-body text-ink-700">
              Join thousands of successful students who have achieved their academic goals with our expert tutoring
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { icon: "🎓", number: "10,000+", label: "Students Tutored", progress: 90 },
              { icon: "👨‍🏫", number: "500+", label: "Expert Tutors", progress: 85 },
              { icon: "📚", number: "15+", label: "Curricula Supported", progress: 75 },
              { icon: "⭐", number: "98%", label: "Student Satisfaction", progress: 98 },
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
              { icon: "🏆", text: "Top Rated Platform" },
              { icon: "🌟", text: "Award Winning" },
              { icon: "🔒", text: "Secure & Trusted" },
              { icon: "💯", text: "Results Guaranteed" },
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

interface PricingPageClientProps {
  initialFilters: {
    grade?: string;
    subject?: string;
    curriculum?: string;
    country: string;
  };
  dropdownOptions: DropdownOptions;
  locale?: string;
}

const PricingPageClient: React.FC<PricingPageClientProps> = memo(
  ({ initialFilters, dropdownOptions, locale = "en" }) => {
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
        <section className="bg-gradient-to-br from-brand-50 to-white py-20">
          <Container size="lg">
            <div className="text-center">
              <h1 className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900">
                Find Your Perfect Tutoring Package
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-heading text-body text-ink-700">
                Expert tutoring tailored to your curriculum, grade level, and learning goals. Join thousands of students achieving academic excellence with our personalized approach.
              </p>
            </div>
          </Container>
        </section>

        <PricingSection filters={filters} dropdownOptions={dropdownOptions} locale={locale} />

        <React.Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center bg-ink-50">
              <p className="font-heading text-body text-ink-700">Loading testimonials...</p>
            </div>
          }
        >
          <TrustSection />
        </React.Suspense>
      </>
    );
  },
);

PricingPageClient.displayName = "PricingPageClient";

export default PricingPageClient;
