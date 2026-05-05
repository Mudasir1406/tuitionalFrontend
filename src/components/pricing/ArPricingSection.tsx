"use client";

import React from "react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/utils/cn";
import { getPricingPageData } from "@/services/pricing/pricing-api";
import { PricingFilters } from "@/types/pricing";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";
import ArPackageCard from "./ArPackageCard";

const ArCustomPricingModal = dynamic(() => import("./ArCustomPricingModal"), {
  ssr: false,
  loading: () => null,
});

interface ArPricingSectionProps {
  filters: PricingFilters;
  dropdownOptions: DropdownOptions;
  locale?: string;
}

const ArPricingSection: React.FC<ArPricingSectionProps> = ({
  filters,
  dropdownOptions,
  locale = "ar",
}) => {
  const [pricingData, setPricingData] = React.useState<any>(null);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [sessionType, setSessionType] = React.useState<"online" | "custom">("online");

  const handleTabChange = (newSessionType: "online" | "custom") => {
    setSessionType(newSessionType);
    if (newSessionType === "custom") setIsModalOpen(true);
  };

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getPricingPageData(filters, locale);
        setPricingData(data);
        setHasError(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.error("Error loading pricing data:", error);
        setHasError(true);
        setPricingData({ packages: [], filterOptions: { grades: [], subjects: [], curricula: [], countries: [] } });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [filters, locale]);

  if (isLoading) {
    return (
      <section className="py-12" dir="rtl">
        <Container size="lg">
          <p className="text-center font-heading text-body text-ink-700">جاري تحميل الباقات...</p>
        </Container>
      </section>
    );
  }

  if (!pricingData || pricingData.packages.length === 0) {
    return (
      <section className="py-12" dir="rtl">
        <Container size="lg">
          <div className="text-center">
            <h4 className="font-heading text-h4 text-ink-900">
              {hasError ? "الخدمة غير متاحة مؤقتاً" : "لا توجد باقات متاحة"}
            </h4>
            <p className="mt-2 font-heading text-body text-ink-700">
              {hasError
                ? "نواجه صعوبات تقنية. يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بفريق الدعم."
                : "لا توجد لدينا أي باقات متاحة للمعايير المحددة. يرجى تجربة مرشحات أخرى أو الاتصال بنا مباشرة."}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12" dir="rtl">
      <Container size="lg">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-center font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-ink-900">
            باقاتنا
          </h2>

          <div className="inline-flex rounded-full bg-ink-100 p-1">
            <button
              type="button"
              onClick={() => handleTabChange("online")}
              className={cn(
                "rounded-full px-4 py-2 font-body text-form-input font-semibold transition-colors",
                sessionType === "online" ? "bg-white text-brand-500 shadow-sm" : "text-ink-700",
              )}
            >
              جلسات عبر الإنترنت (وفر حتى 30%)
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("custom")}
              className={cn(
                "rounded-full px-4 py-2 font-body text-form-input font-semibold transition-colors",
                sessionType === "custom" ? "bg-white text-brand-500 shadow-sm" : "text-ink-700",
              )}
            >
              منشئ الباقات المخصصة
            </button>
          </div>
        </div>

        {sessionType === "online" ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingData.packages
              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              .slice(0, 3)
              .map((pkg: any, index: number) => (
                <ArPackageCard
                  key={pkg.id}
                  package={pkg}
                  userCountry={filters.country}
                  locale={locale}
                  isPopular={index === 1}
                  sessionType={sessionType}
                />
              ))}
          </div>
        ) : (
          <div className="mt-12 rounded-lg bg-brand-50 p-12 text-center">
            <h4 className="font-heading text-h4 text-ink-900">🎯 منشئ الباقات المخصصة</h4>
            <p className="mt-2 font-heading text-body text-ink-700">
              قم بتكوين باقة التدريس المثالية لك مع ساعات مرنة ومواد دراسية وفئات أسعار. سيتم فتح المنشئ تلقائياً.
            </p>
            {!isModalOpen && (
              <Button onClick={() => setIsModalOpen(true)} variant="primary" className="mt-6 font-heading">
                فتح منشئ الباقات
              </Button>
            )}
          </div>
        )}

        <ArCustomPricingModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userCountry={filters.country}
          dropdownOptions={dropdownOptions}
        />
      </Container>
    </section>
  );
};

export default ArPricingSection;
