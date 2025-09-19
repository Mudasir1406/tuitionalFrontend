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
  flag: string;
  currency: string;
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