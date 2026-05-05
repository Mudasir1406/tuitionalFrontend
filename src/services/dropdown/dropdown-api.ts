import { doc, getDoc, FirestoreError } from 'firebase/firestore';
import { db } from '../../firebaseConfig/config';

export interface DropdownOptions {
  grades: string[];
  subjects: string[];
  curriculum: string[];
  countries: string[];
  currencies: {
    [country: string]: string;
  };
  lastUpdated?: string;
}

// Fallback data for SSR reliability - English
const getFallbackDropdownOptionsEn = (): DropdownOptions => ({
  grades: [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12', 'AS Level', 'A2 Level',
    'IB Year 1', 'IB Year 2'
  ],
  subjects: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'Arabic', 'Computer Science', 'Economics',
    'Business Studies', 'Accounting', 'History', 'Geography',
    'Psychology', 'Art & Design', 'French', 'Spanish'
  ],
  curriculum: [
    'British', 'American', 'IB', 'Canadian', 'Australian',
    'IGCSE', 'A-Levels', 'SAT', 'AP', 'CBSE', 'ICSE'
  ],
  countries: [
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait',
    'Bahrain', 'Oman', 'United States', 'United Kingdom', 'Canada'
  ],
  currencies: {
    'United Arab Emirates': 'AED',
    'Saudi Arabia': 'SAR',
    'Qatar': 'QAR',
    'Kuwait': 'KWD',
    'Bahrain': 'BHD',
    'Oman': 'OMR',
    'United States': 'USD',
    'United Kingdom': 'GBP',
    'Canada': 'CAD'
  }
});

// Fallback data for SSR reliability - Arabic
const getFallbackDropdownOptionsAr = (): DropdownOptions => ({
  grades: [
    'الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس',
    'الصف السادس', 'الصف السابع', 'الصف الثامن', 'الصف التاسع', 'الصف العاشر',
    'الصف الحادي عشر', 'الصف الثاني عشر', 'المستوى التمهيدي', 'المستوى المتقدم',
    'السنة الأولى IB', 'السنة الثانية IB'
  ],
  subjects: [
    'الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء',
    'اللغة الإنجليزية', 'اللغة العربية', 'علوم الحاسوب', 'الاقتصاد',
    'دراسات الأعمال', 'المحاسبة', 'التاريخ', 'الجغرافيا',
    'علم النفس', 'الفن والتصميم', 'اللغة الفرنسية', 'اللغة الإسبانية'
  ],
  curriculum: [
    'البريطاني', 'الأمريكي', 'IB', 'الكندي', 'الأسترالي',
    'IGCSE', 'A-Levels', 'SAT', 'AP', 'CBSE', 'ICSE'
  ],
  countries: [
    'دولة الإمارات العربية المتحدة', 'المملكة العربية السعودية', 'دولة قطر', 'دولة الكويت',
    'مملكة البحرين', 'سلطنة عُمان', 'الولايات المتحدة الأمريكية', 'المملكة المتحدة', 'كندا'
  ],
  currencies: {
    'دولة الإمارات العربية المتحدة': 'AED',
    'المملكة العربية السعودية': 'SAR',
    'دولة قطر': 'QAR',
    'دولة الكويت': 'KWD',
    'مملكة البحرين': 'BHD',
    'سلطنة عُمان': 'OMR',
    'الولايات المتحدة الأمريكية': 'USD',
    'المملكة المتحدة': 'GBP',
    'كندا': 'CAD'
  }
});

// Generic fallback function that chooses based on locale
const getFallbackDropdownOptions = (locale: 'en' | 'ar' = 'en'): DropdownOptions => {
  return locale === 'ar' ? getFallbackDropdownOptionsAr() : getFallbackDropdownOptionsEn();
};

/**
 * Server-side function to fetch dropdown options from Firebase
 * Supports both English and Arabic locales
 * Returns fallback data if Firebase fails (for SSR reliability)
 */
export const getDropdownOptions = async (locale: 'en' | 'ar' = 'en'): Promise<DropdownOptions> => {
  try {
    const collectionName = locale === 'ar' ? 'dropdown-items-ar' : 'dropdown-items';
    const docRef = doc(db, collectionName, 'educational-options');
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as DropdownOptions;
      if (data.grades && data.subjects && data.curriculum && data.countries && data.currencies) {
        return {
          grades: data.grades,
          subjects: data.subjects,
          curriculum: data.curriculum,
          countries: data.countries,
          currencies: data.currencies,
          lastUpdated: data.lastUpdated
        };
      }
    }

    return getFallbackDropdownOptions(locale);

  } catch (error) {
    handleFirestoreError(error as FirestoreError);
    return getFallbackDropdownOptions(locale);
  }
};

/**
 * Get dropdown options for custom pricing specifically
 * This can be different from regular package filters
 */
export const getCustomPricingDropdownOptions = async (locale: 'en' | 'ar' = 'en'): Promise<DropdownOptions> => {
  // For now, use the same dropdown options
  // Can be extended later if custom pricing needs different options
  return getDropdownOptions(locale);
};

/**
 * Validate if dropdown data is complete and valid
 */
export const validateDropdownData = (data: Partial<DropdownOptions>): data is DropdownOptions => {
  return !!(
    data.grades && Array.isArray(data.grades) && data.grades.length > 0 &&
    data.subjects && Array.isArray(data.subjects) && data.subjects.length > 0 &&
    data.curriculum && Array.isArray(data.curriculum) && data.curriculum.length > 0 &&
    data.countries && Array.isArray(data.countries) && data.countries.length > 0 &&
    data.currencies && typeof data.currencies === 'object' && Object.keys(data.currencies).length > 0
  );
};

/**
 * Get dropdown options with cache (for performance)
 * Note: Cache should be implemented at the application level for SSR
 */
export const getCachedDropdownOptions = async (
  locale: 'en' | 'ar' = 'en',
  maxAge: number = 5 * 60 * 1000 // 5 minutes default
): Promise<DropdownOptions> => {
  // For now, just fetch fresh data
  // Can implement caching later if needed
  return getDropdownOptions(locale);
};

// Centralized error handling for Firestore errors
const handleFirestoreError = (error: FirestoreError) => {
  console.error("Dropdown Firestore error:", error.code, error.message);
};

