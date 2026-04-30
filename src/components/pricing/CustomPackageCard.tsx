import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomPackageCardProps {
  baseRate: number;
  currency: string;
  onBuildPackage?: () => void;
  onLearnMore?: () => void;
}

const CustomPackageCard: React.FC<CustomPackageCardProps> = ({
  baseRate,
  currency,
  onBuildPackage,
}) => {
  const features = [
    "1-on-1 personalized sessions",
    "Flexible scheduling",
    "Progress tracking included",
    "All subjects available",
    "Money-back guarantee",
  ];

  return (
    <div className="relative flex flex-col rounded-lg bg-gradient-to-br from-brand-50 to-white p-6 shadow-card ring-2 ring-brand-500">
      <div className="absolute -top-3 start-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase text-white">
        ⚡ CUSTOM PLAN
      </div>

      <div className="mb-4 mt-2">
        <h3 className="font-heading text-h4 text-ink-900">Build Your Package</h3>
        <p className="mt-2 font-heading text-small text-ink-700">
          Design your perfect tutoring experience with complete flexibility and personalization.
        </p>
      </div>

      <div className="mb-6 border-b border-ink-200 pb-4">
        <p className="font-heading text-small text-ink-700">Starting from</p>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-h5 text-ink-700">{currency}</span>
          <span className="font-heading text-stat-number text-ink-900">{baseRate}</span>
        </div>
        <p className="font-heading text-small text-ink-700">per hour</p>
        <p className="mt-1 font-heading text-small text-brand-700">Build exactly what you need</p>
      </div>

      <div className="flex-1">
        <ul className="flex flex-col gap-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 font-heading text-small text-ink-800">
              <Check size={16} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Button onClick={onBuildPackage} variant="primary" className="w-full">
          Build Your Package
        </Button>
        <p className="mt-3 text-center font-heading text-small text-ink-700">
          🔒 Free consultation included
        </p>
      </div>
    </div>
  );
};

export default CustomPackageCard;
