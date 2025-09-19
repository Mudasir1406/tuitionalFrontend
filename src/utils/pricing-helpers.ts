import { CountryInfo } from "@/types/pricing";

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  {
    code: "United Arab Emirates",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currency: "AED",
  },
  { code: "United States", name: "United States", flag: "🇺🇸", currency: "USD" },
  {
    code: "United Kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
  },
  { code: "Canada", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "Saudi Arabia", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR" },
  { code: "Qatar", name: "Qatar", flag: "🇶🇦", currency: "QAR" },
  { code: "Kuwait", name: "Kuwait", flag: "🇰🇼", currency: "KWD" },
];

// Map API country codes to pricing country names (matching Firebase data structure)
export const mapApiCountryToPricing = (apiCountry: string): string => {
  const countryMapping: { [key: string]: string } = {
    // Country codes to Firebase format
    AE: "UAE",
    SA: "Saudi Arabia", 
    QA: "Qatar",
    KW: "Kuwait",
    BH: "Bahrain",
    OM: "Oman",
    US: "USA",
    GB: "UK", 
    CA: "Canada",
    // Full country names to Firebase format
    "United Arab Emirates": "UAE",
    "Saudi Arabia": "Saudi Arabia",
    Qatar: "Qatar", 
    Kuwait: "Kuwait",
    Bahrain: "Bahrain",
    Oman: "Oman",
    "United States": "USA",
    "United Kingdom": "UK",
    Canada: "Canada",
  };
  return countryMapping[apiCountry] || "Saudi Arabia"; // Default to Saudi Arabia
};

export const formatPrice = (
  price: number,
  currency: string,
  locale?: string
): string => {
  try {
    return new Intl.NumberFormat(locale || "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    return `${price} ${currency}`;
  }
};

export const getCurrencySymbol = (currency: string): string => {
  const symbols: { [key: string]: string } = {
    AED: "AED",
    SAR: "SAR",
    QAR: "QAR",
    KWD: "KWD",
    USD: "$",
    GBP: "£",
    EUR: "€",
    CAD: "C$",
    BHD: "BHD",
    OMR: "OMR",
  };
  return symbols[currency] || currency;
};

export const calculateTotalPrice = (
  basePrice: number,
  sessionsPerWeek: number,
  weeks: number = 4
): number => {
  return basePrice * sessionsPerWeek * weeks;
};

// Reverse mapping from Firebase format back to display format
export const mapPricingToDisplayCountry = (pricingCountry: string): string => {
  const reverseMapping: { [key: string]: string } = {
    "UAE": "United Arab Emirates",
    "Saudi Arabia": "Saudi Arabia",
    "Qatar": "Qatar", 
    "Kuwait": "Kuwait",
    "Bahrain": "Bahrain",
    "Oman": "Oman",
    "USA": "United States",
    "UK": "United Kingdom",
    "Canada": "Canada",
  };
  return reverseMapping[pricingCountry] || pricingCountry;
};

export const getCountryInfo = (countryCode: string): CountryInfo => {
  return (
    SUPPORTED_COUNTRIES.find((c) => c.code === countryCode) ||
    SUPPORTED_COUNTRIES[0]
  );
};
