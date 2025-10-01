export interface TutoringPackage {
  id: string;
  name: string;
  description: string;
  grades: string[];
  subjects: string[];
  curriculum: string[];
  features: string[];
  sessionsPerWeek: number;
  sessionDuration: string;
  pricing: {
    [country: string]: {
      price: number;
      currency: string;
    };
  };
  discountPercentage?: number; // Discount percentage for online sessions (e.g., 30 for 30%)
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PricingFilters {
  grade?: string;
  subject?: string;
  curriculum?: string;
  country: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  nameAr?: string;
  flag: string;
  currency: string;
  dbKey?: string; // Database key used in Firebase pricing (e.g., "USA" for "United States")
}


export interface PricingPageData {
  packages: TutoringPackage[];
  filterOptions: {
    grades: string[];
    subjects: string[];
    curricula: string[];
    countries: string[];
  };
}

export interface DiscountTier {
  id: string;
  minHours: number;
  maxHours: number | null;
  discountPercentage: number;
  finalRatePerHour: number;
  isActive: boolean;
  description: string;
}

export interface CustomPackage {
  id: string;
  packageName: string;

  // Academic Configuration
  country: string;
  grade: string;
  level: string;
  curriculum: string;
  subject: string;

  // Pricing
  baseRatePerHour: number;
  currency: string;

  // Hour-based Discount Tiers
  discountTiers: DiscountTier[];

  // Metadata
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
  features?: string[];
}

export interface CustomPricingSelection {
  country: string;
  grade: string;
  level: string;
  curriculum: string;
  subject: string;
  hours: number;
}