import React, { memo, useMemo, useState } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TutoringPackage } from "@/types/pricing";
import { getCurrencySymbol } from "@/utils/pricing-helpers";
import { cn } from "@/utils/cn";

interface ArPackageCardProps {
  package: TutoringPackage;
  userCountry: string;
  locale?: string;
  isPopular?: boolean;
  sessionType?: "online" | "offline";
}

const ArPackageCard: React.FC<ArPackageCardProps> = memo(
  ({ package: pkg, userCountry, locale = "ar", isPopular = false, sessionType = "online" }) => {
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const userPrice = pkg.pricing[userCountry];

    const { displayPrice, currencySymbol, basePrice, discount } = useMemo(() => {
      if (!userPrice) return { displayPrice: 0, currencySymbol: "", basePrice: 0, discount: 0 };
      const calculatedBasePrice = userPrice.price;
      const discountPercent = pkg.discountPercentage || 0;
      const calculatedDisplayPrice =
        sessionType === "online" && discountPercent > 0
          ? Math.round(calculatedBasePrice * (1 - discountPercent / 100))
          : calculatedBasePrice;
      return {
        displayPrice: calculatedDisplayPrice,
        currencySymbol: getCurrencySymbol(userPrice.currency),
        basePrice: calculatedBasePrice,
        discount: discountPercent,
      };
    }, [userPrice, sessionType, pkg.discountPercentage]);

    if (!userPrice) return null;

    return (
      <div
        className={cn(
          "relative flex flex-col rounded-lg bg-white p-6 shadow-card",
          isPopular && "ring-2 ring-brand-500",
        )}
        dir="rtl"
      >
        <div className="mb-4">
          <h3 className="font-heading text-h4 text-ink-900">{pkg.name}</h3>
        </div>

        <div className="mb-6 border-b border-ink-200 pb-4">
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-h5 text-ink-700">{currencySymbol}</span>
            <span className="font-heading text-stat-number text-ink-900">{displayPrice}</span>
          </div>
          <p className="font-heading text-small text-ink-700">لكل جلسة</p>
          {sessionType === "online" && basePrice !== displayPrice && discount > 0 && (
            <p className="mt-1 font-heading text-small">
              <span className="line-through text-ink-500">
                {currencySymbol}
                {basePrice}
              </span>{" "}
              <span className="text-success font-semibold">وفر {discount}%</span>
            </p>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2">
            {(showAllFeatures ? pkg.features : pkg.features?.slice(0, 5))?.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 font-heading text-small text-ink-800">
                <Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
                <span>{feature}</span>
              </div>
            ))}
            {pkg.features && pkg.features.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="text-start font-heading text-small text-brand-500 hover:underline"
              >
                {showAllFeatures ? "عرض أقل" : `+${pkg.features.length - 5} ميزات أخرى`}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button variant={isPopular ? "primary" : "outline"} className="w-full">
            ابدأ الآن
          </Button>
        </div>
      </div>
    );
  },
);

ArPackageCard.displayName = "ArPackageCard";

export default ArPackageCard;
