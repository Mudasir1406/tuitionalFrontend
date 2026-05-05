import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomPricingCardProps {
  userCountry: string;
  onConfigureClick: () => void;
}

const getCurrency = (country: string) => {
  const currencyMap: Record<string, string> = {
    "United Arab Emirates": "AED",
    "Saudi Arabia": "SAR",
    Qatar: "QAR",
    Kuwait: "KWD",
    "United States": "USD",
    "United Kingdom": "GBP",
    Canada: "CAD",
  };
  return currencyMap[country] || "USD";
};

const CustomPricingCard: React.FC<CustomPricingCardProps> = ({ userCountry, onConfigureClick }) => {
  const features = [
    "Choose your own subjects",
    "Select grade & curriculum",
    "Flexible hours & schedule",
    "Volume discounts available",
    "Personal learning plan",
    "Progress tracking included",
  ];

  return (
    <div className="relative flex flex-col rounded-lg bg-gradient-to-br from-brand-50 to-white p-6 shadow-card ring-2 ring-brand-500">
      <div className="absolute -top-3 start-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase text-white">
        ⚡ CUSTOM PRICING
      </div>

      <div className="mb-4 mt-2">
        <h3 className="font-heading text-h4 text-ink-900">Configure Your Package</h3>
        <p className="mt-2 font-heading text-small text-ink-700">
          Build your perfect tutoring plan with hour-based pricing and volume discounts.
        </p>
      </div>

      <div className="mb-6 border-b border-ink-200 pb-4">
        <p className="font-heading text-small text-ink-700">Starting from</p>
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-h5 text-ink-700">{getCurrency(userCountry)}</span>
          <span className="font-heading text-stat-number text-ink-900">50</span>
        </div>
        <p className="font-heading text-small text-ink-700">per hour</p>
        <p className="mt-1 font-heading text-small text-brand-700">
          Price varies by subject & volume
        </p>
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
        <Button onClick={onConfigureClick} variant="primary" className="w-full font-heading">
          Configure Package
        </Button>
        <p className="mt-3 text-center font-heading text-small text-ink-700">
          🔒 Free consultation & trial session
        </p>
      </div>
    </div>
  );
};

export default CustomPricingCard;
