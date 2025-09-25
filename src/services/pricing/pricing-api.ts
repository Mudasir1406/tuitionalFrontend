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
    isActive: true,
    order: 3
  }
];

// Get all active pricing packages
export const getActivePricingPackages = async (locale: string = 'en'): Promise<TutoringPackage[]> => {
  try {
    const collectionName = 'tutoring-packages'; // Simple collection name
    console.log('🔥 Firebase Debug - Fetching from collection:', collectionName);
    console.log('🔥 Firebase Debug - Database instance:', db);
    console.log('🔥 Firebase Debug - Project ID:', db.app.options.projectId);
    
    // Try to get all documents first (without where clause to test connection)
    const allDocsSnapshot = await getDocs(collection(db, collectionName));
    console.log('🔥 Firebase Debug - Total documents in collection:', allDocsSnapshot.size);
    
    // Log all document IDs and data for debugging
    allDocsSnapshot.docs.forEach((doc, index) => {
      console.log(`🔥 Firebase Debug - Document ${index + 1}:`, {
        id: doc.id,
        data: doc.data()
      });
    });
    
    if (allDocsSnapshot.empty) {
      console.log('🔥 Firebase Debug - Collection is empty, using fallback data');
      return getFallbackPackages();
    }

    // First, let's try to get ALL documents without any filters
    console.log('🔥 Firebase Debug - Getting all documents without filters...');
    const allPackages = allDocsSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('🔥 Firebase Debug - Processing document:', doc.id, data);
      return { 
        id: doc.id, 
        ...data 
      };
    }) as TutoringPackage[];
    
    if (allPackages.length > 0) {
      console.log('🔥 Firebase Debug - Found real packages:', allPackages.length);
      console.log('🔥 Firebase Debug - Sample package structure:', allPackages[0]);
      console.log('🔥 Firebase Debug - All package names:', allPackages.map(p => p.name));
      console.log('🔥 Firebase Debug - Returning real data instead of fallback');
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
      console.log('🔥 Firebase Debug - Active packages found:', snapshot.size);
      
      const packages = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('🔥 Firebase Debug - Active package data:', data);
        return { 
          id: doc.id, 
          ...data 
        };
      }) as TutoringPackage[];
      
      if (packages.length > 0) {
        return packages;
      }
    } catch (queryError) {
      console.log('🔥 Firebase Debug - Query with where/orderBy failed:', queryError);
      console.log('🔥 Firebase Debug - This might be because fields dont exist or no index');
    }
    
    console.log('🔥 Firebase Debug - No packages found at all, using fallback data');
    return getFallbackPackages();
    
  } catch (error) {
    console.error('🔥 Firebase Debug - Error fetching packages:', error);
    handleFirestoreError(error as FirestoreError);
    // Always return fallback data on error
    return getFallbackPackages();
  }
};

// Get packages filtered by criteria
export const getPackagesByFilter = async (
  filters: PricingFilters, 
  locale: string = 'en'
): Promise<TutoringPackage[]> => {
  const packages = await getActivePricingPackages(locale);
  console.log('🔥 Filter Debug - Got packages from Firebase:', packages.length);
  console.log('🔥 Filter Debug - Current filters:', filters);
  
  const filteredPackages = packages.filter(pkg => {
    console.log('🔥 Filter Debug - Checking package:', pkg.name);
    console.log('🔥 Filter Debug - Package pricing countries:', Object.keys(pkg.pricing || {}));
    
    // Filter by grade
    if (filters.grade && !pkg.grades?.includes(filters.grade)) {
      console.log('🔥 Filter Debug - Package rejected: grade mismatch');
      return false;
    }
    
    // Filter by subject
    if (filters.subject && !pkg.subjects?.includes(filters.subject)) {
      console.log('🔥 Filter Debug - Package rejected: subject mismatch');
      return false;
    }
    
    // Filter by curriculum
    if (filters.curriculum && !pkg.curriculum?.includes(filters.curriculum)) {
      console.log('🔥 Filter Debug - Package rejected: curriculum mismatch');
      return false;
    }
    
    // Must have pricing for user's country
    if (!pkg.pricing || !pkg.pricing[filters.country]) {
      console.log('🔥 Filter Debug - Package rejected: no pricing for country', filters.country);
      console.log('🔥 Filter Debug - Available countries:', Object.keys(pkg.pricing || {}));
      return false;
    }
    
    console.log('🔥 Filter Debug - Package accepted:', pkg.name);
    return true;
  });
  
  console.log('🔥 Filter Debug - Final filtered packages:', filteredPackages.length);
  console.log('🔥 Filter Debug - Filtered package names:', filteredPackages.map(p => p.name));
  
  return filteredPackages;
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
    console.log('🔥 Custom Packages Debug - Fetching from custom-pricing collection...');

    const q = query(
      collection(db, 'custom-pricing'),
      where('isActive', '==', true)
    );

    const snapshot = await getDocs(q);
    console.log('🔥 Custom Packages Debug - Found documents:', snapshot.size);

    if (snapshot.empty) {
      console.log('🔥 Custom Packages Debug - No custom packages found, using fallback data');
      return getFallbackCustomPackages();
    }

    const packages = snapshot.docs.map(doc => {
      const data = doc.data();
      console.log('🔥 Custom Packages Debug - Processing package:', doc.id, data);
      return {
        id: doc.id,
        ...data
      };
    }) as CustomPackage[];

    // Sort by order field in JavaScript (since Firebase orderBy requires an index)
    const sortedPackages = packages.sort((a, b) => (a.order || 0) - (b.order || 0));

    console.log('🔥 Custom Packages Debug - Returning packages:', sortedPackages.length);
    return sortedPackages;

  } catch (error) {
    console.error('🔥 Custom Packages Debug - Error fetching custom packages:', error);
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
    console.log('🔥 Custom Package Search - Original selection:', selection);

    // Map the user's grade to grade group for database search
    const gradeGroup = mapGradeToGradeGroup(selection.grade);
    console.log(`🔥 Custom Package Search - Mapped grade "${selection.grade}" to grade group "${gradeGroup}"`);

    const packages = await getActiveCustomPackages();
    console.log('🔥 Custom Package Search - Available packages count:', packages.length);

    // Log all available packages for debugging
    packages.forEach((pkg, index) => {
      console.log(`🔥 Custom Package Search - Package ${index + 1}:`, {
        id: pkg.id,
        country: pkg.country,
        grade: pkg.grade, // This should now be grade group like "Elementary (1-4)"
        packageName: pkg.packageName
      });
    });

    // NEW LOGIC: Search only by country and grade group (subjects and curricula are universal)
    const matchingPackage = packages.find(pkg => {
      const countryMatch = pkg.country === selection.country;
      const gradeGroupMatch = pkg.grade === gradeGroup; // Match against grade group, not individual grade

      console.log(`🔥 Custom Package Search - Checking package ${pkg.id}:`, {
        countryMatch: `"${pkg.country}" === "${selection.country}" = ${countryMatch}`,
        gradeGroupMatch: `"${pkg.grade}" === "${gradeGroup}" = ${gradeGroupMatch}`,
        overallMatch: countryMatch && gradeGroupMatch
      });

      return countryMatch && gradeGroupMatch;
    });

    if (matchingPackage) {
      console.log('🔥 Custom Package Search - Found match:', {
        id: matchingPackage.id,
        packageName: matchingPackage.packageName,
        country: matchingPackage.country,
        gradeGroup: matchingPackage.grade,
        note: 'This package covers all subjects & curricula for this country/grade group'
      });
    } else {
      console.log('🔥 Custom Package Search - No match found for:', {
        country: selection.country,
        gradeGroup: gradeGroup,
        originalGrade: selection.grade
      });
    }

    return matchingPackage || null;

  } catch (error) {
    console.error('🔥 Custom Package Search - Error:', error);
    return null;
  }
};

// Get unique options for custom package configuration
export const getCustomPackageOptions = async () => {
  try {
    const packages = await getActiveCustomPackages();

    const options = {
      countries: Array.from(new Set(packages.map(pkg => pkg.country))).sort(),
      grades: Array.from(new Set(packages.map(pkg => pkg.grade))).sort(),
      levels: Array.from(new Set(packages.map(pkg => pkg.level))).sort(),
      curricula: Array.from(new Set(packages.map(pkg => pkg.curriculum))).sort(),
      subjects: Array.from(new Set(packages.map(pkg => pkg.subject))).sort()
    };

    console.log('🔥 Custom Package Options - Available options:', options);
    return options;

  } catch (error) {
    console.error('🔥 Custom Package Options - Error:', error);
    return {
      countries: [],
      grades: [],
      levels: [],
      curricula: [],
      subjects: []
    };
  }
};

// Calculate pricing for a custom selection
export const calculateCustomPricing = async (selection: CustomPricingSelection) => {
  try {
    console.log('🔥 Custom Pricing Calculation - Input:', selection);

    const customPackage = await findCustomPackage(selection);

    if (!customPackage) {
      console.log('🔥 Custom Pricing Calculation - No matching package found');
      return null;
    }

    // Find applicable discount tier
    console.log('🔥 Custom Pricing Calculation - Available discount tiers:', customPackage.discountTiers);
    console.log('🔥 Custom Pricing Calculation - Looking for hours:', selection.hours);

    const activeTiers = customPackage.discountTiers.filter(tier => tier.isActive);
    console.log('🔥 Custom Pricing Calculation - Active discount tiers:', activeTiers);

    const applicableTier = activeTiers.find(tier => {
      const minCheck = selection.hours >= tier.minHours;
      const maxCheck = tier.maxHours === null || selection.hours <= tier.maxHours;
      console.log(`🔥 Custom Pricing Calculation - Checking tier ${tier.id}:`, {
        minHours: tier.minHours,
        maxHours: tier.maxHours,
        selectionHours: selection.hours,
        minCheck: `${selection.hours} >= ${tier.minHours} = ${minCheck}`,
        maxCheck: `${tier.maxHours === null ? 'null (no limit)' : selection.hours + ' <= ' + tier.maxHours} = ${maxCheck}`,
        matches: minCheck && maxCheck
      });
      return minCheck && maxCheck;
    });

    let finalRate: number;
    let discountPercentage: number;
    let totalCost: number;
    let originalCost: number;
    let savings: number;

    if (!applicableTier) {
      console.log('🔥 Custom Pricing Calculation - No applicable discount tier found for', selection.hours, 'hours');
      console.log('🔥 Custom Pricing Calculation - Using base rate without discount');

      // Use base rate without any discount
      finalRate = customPackage.baseRatePerHour;
      discountPercentage = 0;
      totalCost = finalRate * selection.hours;
      originalCost = totalCost; // Same as total since no discount
      savings = 0;
    } else {
      console.log('🔥 Custom Pricing Calculation - Selected discount tier:', applicableTier);

      // Use discount tier pricing
      finalRate = applicableTier.finalRatePerHour;
      discountPercentage = applicableTier.discountPercentage;
      totalCost = finalRate * selection.hours;
      originalCost = customPackage.baseRatePerHour * selection.hours;
      savings = originalCost - totalCost;
    }

    const result = {
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

    console.log('🔥 Custom Pricing Calculation - Result:', result);
    return result;

  } catch (error) {
    console.error('🔥 Custom Pricing Calculation - Error:', error);
    return null;
  }
};