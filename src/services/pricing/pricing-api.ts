import { collection, getDocs, doc, getDoc, query, where, orderBy, FirestoreError } from 'firebase/firestore';
import { db } from '../../firebaseConfig/config';
import { TutoringPackage, PricingFilters, PricingPageData, CustomPackage, CustomPricingSelection } from '@/types/pricing';

// Fallback data when Firebase fails or is empty
const getFallbackPackages = (): TutoringPackage[] => [
  {
    id: 'fallback-1',
    name: 'IGCSE Mathematics Premium',
    description: 'Complete IGCSE Math tutoring with certified teachers and personalized learning plans',
    grades: ['Grade 9', 'Grade 10', 'IGCSE'],
    subjects: ['Mathematics'],
    curriculum: ['British', 'IGCSE'],
    features: [
      '1-on-1 Live Sessions',
      'Practice Worksheets',
      'Progress Reports',
      '24/7 Support',
      'Exam Preparation'
    ],
    sessionsPerWeek: 2,
    sessionDuration: '60 minutes',
    pricing: {
      'United Arab Emirates': { price: 200, currency: 'AED' },
      'Saudi Arabia': { price: 190, currency: 'SAR' },
      'Qatar': { price: 180, currency: 'QAR' },
      'United States': { price: 50, currency: 'USD' },
      'United Kingdom': { price: 40, currency: 'GBP' },
      'Canada': { price: 65, currency: 'CAD' }
    },
    discountPercentage: 30,
    isActive: true,
    order: 1
  },
  {
    id: 'fallback-2',
    name: 'A-Level Physics Standard',
    description: 'Comprehensive A-Level Physics tutoring with lab simulations and exam techniques',
    grades: ['AS Level', 'A2 Level'],
    subjects: ['Physics'],
    curriculum: ['British', 'Cambridge'],
    features: [
      '1-on-1 Live Sessions',
      'Lab Simulations',
      'Past Papers Practice',
      'Study Materials',
      'Mock Exams'
    ],
    sessionsPerWeek: 3,
    sessionDuration: '45 minutes',
    pricing: {
      'United Arab Emirates': { price: 250, currency: 'AED' },
      'Saudi Arabia': { price: 240, currency: 'SAR' },
      'Qatar': { price: 230, currency: 'QAR' },
      'United States': { price: 65, currency: 'USD' },
      'United Kingdom': { price: 50, currency: 'GBP' },
      'Canada': { price: 80, currency: 'CAD' }
    },
    discountPercentage: 25,
    isActive: true,
    order: 2
  },
  {
    id: 'fallback-3',
    name: 'IB Chemistry Complete',
    description: 'Full IB Chemistry program with internal assessment support and university prep',
    grades: ['IB Year 1', 'IB Year 2'],
    subjects: ['Chemistry'],
    curriculum: ['IB', 'International Baccalaureate'],
    features: [
      '1-on-1 Live Sessions',
      'IA Support',
      'University Preparation',
      'Extended Essay Help',
      'CAS Integration'
    ],
    sessionsPerWeek: 2,
    sessionDuration: '90 minutes',
    pricing: {
      'United Arab Emirates': { price: 300, currency: 'AED' },
      'Saudi Arabia': { price: 290, currency: 'SAR' },
      'Qatar': { price: 280, currency: 'QAR' },
      'United States': { price: 80, currency: 'USD' },
      'United Kingdom': { price: 65, currency: 'GBP' },
      'Canada': { price: 100, currency: 'CAD' }
    },
    discountPercentage: 20,
    isActive: true,
    order: 3
  }
];

// Get all active pricing packages
export const getActivePricingPackages = async (locale: string = 'en'): Promise<TutoringPackage[]> => {
  try {
    const collectionName = 'tutoring-packages';
    const allDocsSnapshot = await getDocs(collection(db, collectionName));

    if (allDocsSnapshot.empty) {
      return getFallbackPackages();
    }

    const allPackages = allDocsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TutoringPackage[];

    if (allPackages.length > 0) {
      return allPackages;
    }

    // Try with query for active packages only if no documents found above
    try {
      const q = query(
        collection(db, collectionName),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      const packages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TutoringPackage[];

      if (packages.length > 0) {
        return packages;
      }
    } catch {
      // Query may fail if index doesn't exist; fall through to fallback
    }

    return getFallbackPackages();

  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return getFallbackPackages();
  }
};

// Get packages filtered by criteria
export const getPackagesByFilter = async (
  filters: PricingFilters,
  locale: string = 'en'
): Promise<TutoringPackage[]> => {
  const packages = await getActivePricingPackages(locale);

  return packages.filter(pkg => {
    if (filters.grade && !pkg.grades?.includes(filters.grade)) return false;
    if (filters.subject && !pkg.subjects?.includes(filters.subject)) return false;
    if (filters.curriculum && !pkg.curriculum?.includes(filters.curriculum)) return false;
    if (!pkg.pricing || !pkg.pricing[filters.country]) return false;
    return true;
  });
};

// Get unique filter options from all packages
export const getUniqueFilterOptions = async (locale: string = 'en') => {
  const packages = await getActivePricingPackages(locale);
  
  return {
    grades: Array.from(new Set(packages.flatMap(pkg => pkg.grades))).sort(),
    subjects: Array.from(new Set(packages.flatMap(pkg => pkg.subjects))).sort(),
    curricula: Array.from(new Set(packages.flatMap(pkg => pkg.curriculum))).sort(),
    countries: Array.from(new Set(packages.flatMap(pkg => Object.keys(pkg.pricing))))
  };
};


// Get all pricing page data
export const getPricingPageData = async (
  filters: PricingFilters,
  locale: string = 'en'
): Promise<PricingPageData> => {
  try {
    const [packages, filterOptions] = await Promise.all([
      getPackagesByFilter(filters, locale),
      getUniqueFilterOptions(locale)
    ]);

    return {
      packages,
      filterOptions
    };
  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return {
      packages: [],
      filterOptions: {
        grades: [],
        subjects: [],
        curricula: [],
        countries: []
      }
    };
  }
};

// Centralized error handling for Firestore errors
const handleFirestoreError = (error: FirestoreError) => {
  console.error("Firestore Error Code:", error.code);
  console.error("Firestore Error Message:", error.message);
};

// ========================================
// CUSTOM PACKAGES API (New Hour-Based Pricing)
// ========================================

// Fallback custom packages data (Updated for new grade group structure)
const getFallbackCustomPackages = (): CustomPackage[] => [
  {
    id: 'custom-1',
    packageName: 'UAE Elementary (1-4) All Subjects & Curricula',
    country: 'UAE',
    grade: 'Elementary (1-4)', // New grade group format
    level: 'All Levels', // Universal coverage
    curriculum: 'All Curricula', // Universal coverage
    subject: 'All Subjects', // Universal coverage
    baseRatePerHour: 75,
    currency: 'AED',
    discountTiers: [
      {
        id: '1',
        minHours: 0,
        maxHours: 8,
        discountPercentage: 0,
        finalRatePerHour: 75,
        isActive: true,
        description: 'Standard Rate'
      },
      {
        id: '2',
        minHours: 9,
        maxHours: 20,
        discountPercentage: 5,
        finalRatePerHour: 71.25,
        isActive: true,
        description: 'Volume Discount'
      },
      {
        id: '3',
        minHours: 21,
        maxHours: 50,
        discountPercentage: 10,
        finalRatePerHour: 67.5,
        isActive: true,
        description: 'Bulk Discount'
      },
      {
        id: '4',
        minHours: 51,
        maxHours: null,
        discountPercentage: 15,
        finalRatePerHour: 63.75,
        isActive: true,
        description: 'Premium Discount'
      }
    ],
    isActive: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Complete elementary tutoring covering all subjects and curricula for grades 1-4',
    features: [
      'All subjects covered',
      'All curricula supported',
      '1-on-1 personalized sessions',
      'Flexible scheduling',
      'Progress tracking'
    ]
  },
  {
    id: 'custom-2',
    packageName: 'UAE Secondary (9-10) All Subjects & Curricula',
    country: 'UAE',
    grade: 'Secondary (9-10)', // New grade group format
    level: 'All Levels',
    curriculum: 'All Curricula',
    subject: 'All Subjects',
    baseRatePerHour: 85,
    currency: 'AED',
    discountTiers: [
      {
        id: '1',
        minHours: 0,
        maxHours: 8,
        discountPercentage: 0,
        finalRatePerHour: 85,
        isActive: true,
        description: 'Standard Rate'
      },
      {
        id: '2',
        minHours: 9,
        maxHours: 20,
        discountPercentage: 5,
        finalRatePerHour: 80.75,
        isActive: true,
        description: 'Volume Discount'
      },
      {
        id: '3',
        minHours: 21,
        maxHours: 50,
        discountPercentage: 10,
        finalRatePerHour: 76.5,
        isActive: true,
        description: 'Bulk Discount'
      },
      {
        id: '4',
        minHours: 51,
        maxHours: null,
        discountPercentage: 15,
        finalRatePerHour: 72.25,
        isActive: true,
        description: 'Premium Discount'
      }
    ],
    isActive: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Comprehensive secondary tutoring covering all subjects and curricula for grades 9-10',
    features: [
      'All subjects covered',
      'All curricula supported',
      'IGCSE exam preparation',
      'Advanced problem solving',
      'University preparation'
    ]
  },
  {
    id: 'custom-3',
    packageName: 'USA Advanced (11-12) All Subjects & Curricula',
    country: 'USA',
    grade: 'Advanced (11-12)', // New grade group format
    level: 'All Levels',
    curriculum: 'All Curricula',
    subject: 'All Subjects',
    baseRatePerHour: 95,
    currency: 'USD',
    discountTiers: [
      {
        id: '1',
        minHours: 0,
        maxHours: 8,
        discountPercentage: 0,
        finalRatePerHour: 95,
        isActive: true,
        description: 'Standard Rate'
      },
      {
        id: '2',
        minHours: 9,
        maxHours: 20,
        discountPercentage: 5,
        finalRatePerHour: 90.25,
        isActive: true,
        description: 'Volume Discount'
      },
      {
        id: '3',
        minHours: 21,
        maxHours: 50,
        discountPercentage: 10,
        finalRatePerHour: 85.5,
        isActive: true,
        description: 'Bulk Discount'
      }
    ],
    isActive: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Advanced tutoring covering all subjects and curricula for grades 11-12',
    features: [
      'All subjects covered',
      'All curricula supported',
      'AP exam preparation',
      'SAT/ACT preparation',
      'College application support'
    ]
  },
  {
    id: 'custom-4',
    packageName: 'Saudi Arabia Middle (5-8) All Subjects & Curricula',
    country: 'Saudi Arabia',
    grade: 'Middle (5-8)', // New grade group format
    level: 'All Levels',
    curriculum: 'All Curricula',
    subject: 'All Subjects',
    baseRatePerHour: 80,
    currency: 'SAR',
    discountTiers: [
      {
        id: '1',
        minHours: 0,
        maxHours: 8,
        discountPercentage: 0,
        finalRatePerHour: 80,
        isActive: true,
        description: 'Standard Rate'
      },
      {
        id: '2',
        minHours: 9,
        maxHours: 20,
        discountPercentage: 8,
        finalRatePerHour: 73.6,
        isActive: true,
        description: 'Volume Discount'
      }
    ],
    isActive: true,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Middle school tutoring covering all subjects and curricula for grades 5-8',
    features: [
      'All subjects covered',
      'All curricula supported',
      'Foundation building',
      'Study skills development',
      'Exam preparation'
    ]
  }
];

// Get all active custom packages
export const getActiveCustomPackages = async (): Promise<CustomPackage[]> => {
  try {
    const q = query(
      collection(db, 'custom-pricing'),
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return getFallbackCustomPackages();
    }

    const packages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CustomPackage[];

    return packages.sort((a, b) => (a.order || 0) - (b.order || 0));

  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return getFallbackCustomPackages();
  }
};

// Helper function to map individual grades to grade groups
const mapGradeToGradeGroup = (grade: string): string => {
  const gradeUpper = grade.toLowerCase();

  // Handle specific grade formats first (before numeric extraction)
  if (gradeUpper.includes('igcse')) {
    return 'Secondary (9-10)';
  }
  if (gradeUpper.includes('a-level') || gradeUpper.includes('a level') ||
      gradeUpper.includes('as level') || gradeUpper.includes('a2 level')) {
    return 'Advanced (11-12)';
  }
  if (gradeUpper.includes('ib') || gradeUpper.includes('international baccalaureate')) {
    return 'Advanced (11-12)';
  }
  if (gradeUpper.includes('kindergarten') || gradeUpper.includes('pre-k') || gradeUpper.includes('kg')) {
    return 'Elementary (1-4)';
  }

  // Extract numeric part from grade string
  const numericGrade = parseInt(grade.replace(/\D/g, '')) || 0;

  if (numericGrade >= 1 && numericGrade <= 4) {
    return 'Elementary (1-4)';
  } else if (numericGrade >= 5 && numericGrade <= 8) {
    return 'Middle (5-8)';
  } else if (numericGrade >= 9 && numericGrade <= 10) {
    return 'Secondary (9-10)';
  } else if (numericGrade >= 11 && numericGrade <= 12) {
    return 'Advanced (11-12)';
  } else {
    // Default fallback for unrecognized formats
    console.warn(`🔥 Grade Mapping - Unrecognized grade format: "${grade}", defaulting to Elementary (1-4)`);
    return 'Elementary (1-4)';
  }
};

// Find custom package by academic configuration (Updated for new grade group structure)
export const findCustomPackage = async (selection: Omit<CustomPricingSelection, 'hours'>): Promise<CustomPackage | null> => {
  try {
    const gradeGroup = mapGradeToGradeGroup(selection.grade);
    const packages = await getActiveCustomPackages();

    // Search only by country and grade group (subjects and curricula are universal)
    const matchingPackage = packages.find(pkg =>
      pkg.country === selection.country && pkg.grade === gradeGroup
    );

    return matchingPackage || null;

  } catch (error) {
    return null;
  }
};

// Get unique options for custom package configuration
export const getCustomPackageOptions = async () => {
  try {
    const packages = await getActiveCustomPackages();
    return {
      countries: Array.from(new Set(packages.map(pkg => pkg.country))).sort(),
      grades: Array.from(new Set(packages.map(pkg => pkg.grade))).sort(),
      levels: Array.from(new Set(packages.map(pkg => pkg.level))).sort(),
      curricula: Array.from(new Set(packages.map(pkg => pkg.curriculum))).sort(),
      subjects: Array.from(new Set(packages.map(pkg => pkg.subject))).sort()
    };
  } catch (error) {
    return { countries: [], grades: [], levels: [], curricula: [], subjects: [] };
  }
};

// Calculate pricing for a custom selection
export const calculateCustomPricing = async (selection: CustomPricingSelection) => {
  try {
    const customPackage = await findCustomPackage(selection);
    if (!customPackage) return null;

    const activeTiers = customPackage.discountTiers.filter(tier => tier.isActive);
    const applicableTier = activeTiers.find(tier =>
      selection.hours >= tier.minHours &&
      (tier.maxHours === null || selection.hours <= tier.maxHours)
    );

    let finalRate: number;
    let discountPercentage: number;
    let totalCost: number;
    let originalCost: number;
    let savings: number;

    if (!applicableTier) {
      finalRate = customPackage.baseRatePerHour;
      discountPercentage = 0;
      totalCost = finalRate * selection.hours;
      originalCost = totalCost;
      savings = 0;
    } else {
      finalRate = applicableTier.finalRatePerHour;
      discountPercentage = applicableTier.discountPercentage;
      totalCost = finalRate * selection.hours;
      originalCost = customPackage.baseRatePerHour * selection.hours;
      savings = originalCost - totalCost;
    }

    return {
      customPackage,
      baseRate: customPackage.baseRatePerHour,
      currency: customPackage.currency,
      finalRate,
      totalCost,
      originalCost,
      savings,
      discountTier: applicableTier || null,
      discountPercentage
    };

  } catch (error) {
    return null;
  }
};