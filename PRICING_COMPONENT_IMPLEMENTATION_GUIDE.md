# 🎯 Pricing Component Implementation Guide for Website

## Overview
This guide provides everything needed to implement server-side pricing components on your tutoring website that fetch data from your CMS Firebase collection `tutoring-packages`.

## 📋 Prerequisites
- Next.js 14+ (App Router)
- Firebase v10+
- TypeScript
- Tailwind CSS or your styling framework

---

## 🔥 Firebase Collection Structure

Your CMS creates packages in this format:
```javascript
// Collection: "tutoring-packages" (English) / "tutoring-packages-ar" (Arabic)
{
  id: "auto-generated-id",
  name: "IGCSE Mathematics Premium",
  description: "Complete IGCSE Math tutoring with certified teachers",
  grades: ["Grade 9", "Grade 10", "IGCSE"],
  subjects: ["Mathematics"],
  curriculum: ["British", "IGCSE"],
  features: [
    "1-on-1 Live Sessions",
    "Practice Worksheets", 
    "Progress Reports",
    "24/7 Support"
  ],
  sessionsPerWeek: 2,
  sessionDuration: "60 minutes",
  pricing: {
    "UAE": { price: 200, currency: "AED" },
    "Saudi Arabia": { price: 190, currency: "SAR" },
    "Qatar": { price: 180, currency: "QAR" },
    "USA": { price: 50, currency: "USD" },
    "UK": { price: 40, currency: "GBP" }
  },
  isActive: true,
  order: 1,
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20"
}
```

---

## 📁 File Structure to Create

```
your-website/
├── src/
│   ├── types/
│   │   └── pricing.ts
│   ├── lib/
│   │   ├── firebase.ts
│   │   └── pricing-api.ts
│   ├── utils/
│   │   ├── pricing-helpers.ts
│   │   └── geo-helpers.ts
│   ├── components/pricing/
│   │   ├── PricingSection.tsx
│   │   ├── PackageCard.tsx
│   │   ├── PackageFilter.tsx
│   │   ├── CountrySelector.tsx
│   │   └── PricingCalculator.tsx
│   └── app/pricing/
│       └── page.tsx
```

---

## 📝 Step-by-Step Implementation

### 1. Types Definition
```typescript
// src/types/pricing.ts
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
  createdAt: string;
  updatedAt: string;
}

export interface PricingFilters {
  grade?: string;
  subject?: string;
  curriculum?: string;
  country: string;
}
```

### 2. Firebase Configuration
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config from CMS
  apiKey: "your-api-key",
  authDomain: "your-domain",
  projectId: "your-project-id",
  // ... other config
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 3. Data Fetching Service
```typescript
// src/lib/pricing-api.ts
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { TutoringPackage, PricingFilters } from '@/types/pricing';

export async function getActivePricingPackages(language: 'en' | 'ar' = 'en'): Promise<TutoringPackage[]> {
  try {
    const collectionName = language === 'ar' ? 'tutoring-packages-ar' : 'tutoring-packages';
    
    const q = query(
      collection(db, collectionName),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    })) as TutoringPackage[];
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}

export async function getPackagesByFilter(filters: PricingFilters, language: 'en' | 'ar' = 'en'): Promise<TutoringPackage[]> {
  const packages = await getActivePricingPackages(language);
  
  return packages.filter(pkg => {
    // Filter by grade
    if (filters.grade && !pkg.grades.includes(filters.grade)) {
      return false;
    }
    
    // Filter by subject
    if (filters.subject && !pkg.subjects.includes(filters.subject)) {
      return false;
    }
    
    // Filter by curriculum
    if (filters.curriculum && !pkg.curriculum.includes(filters.curriculum)) {
      return false;
    }
    
    // Must have pricing for user's country
    if (!pkg.pricing[filters.country]) {
      return false;
    }
    
    return true;
  });
}

export async function getUniqueOptions(language: 'en' | 'ar' = 'en') {
  const packages = await getActivePricingPackages(language);
  
  return {
    grades: [...new Set(packages.flatMap(pkg => pkg.grades))],
    subjects: [...new Set(packages.flatMap(pkg => pkg.subjects))],
    curricula: [...new Set(packages.flatMap(pkg => pkg.curriculum))],
    countries: [...new Set(packages.flatMap(pkg => Object.keys(pkg.pricing)))]
  };
}
```

### 4. Helper Utils
```typescript
// src/utils/pricing-helpers.ts
export function formatPrice(price: number, currency: string, locale?: string): string {
  try {
    return new Intl.NumberFormat(locale || 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    return `${price} ${currency}`;
  }
}

export function calculateTotalPrice(basePrice: number, sessionsPerWeek: number, weeks: number = 4): number {
  return basePrice * sessionsPerWeek * weeks;
}

export function getCurrencySymbol(currency: string): string {
  const symbols: { [key: string]: string } = {
    'AED': 'د.إ',
    'SAR': 'ر.س',
    'QAR': 'ر.ق',
    'KWD': 'د.ك',
    'USD': '$',
    'GBP': '£',
    'EUR': '€',
    'CAD': 'C$',
  };
  return symbols[currency] || currency;
}
```

```typescript
// src/utils/geo-helpers.ts
import { headers } from 'next/headers';

export function getUserCountryFromHeaders(): string {
  try {
    const headersList = headers();
    
    // Try Cloudflare header
    const cfCountry = headersList.get('cf-ipcountry');
    if (cfCountry) return mapCountryCode(cfCountry);
    
    // Try Vercel header
    const vercelCountry = headersList.get('x-vercel-ip-country');
    if (vercelCountry) return mapCountryCode(vercelCountry);
    
    // Default fallback
    return 'UAE';
  } catch (error) {
    return 'UAE';
  }
}

function mapCountryCode(code: string): string {
  const countryMap: { [key: string]: string } = {
    'AE': 'UAE',
    'SA': 'Saudi Arabia',
    'QA': 'Qatar',
    'KW': 'Kuwait',
    'US': 'USA',
    'GB': 'UK',
    'CA': 'Canada',
  };
  return countryMap[code] || 'UAE';
}
```

### 5. Main Server Component
```typescript
// src/components/pricing/PricingSection.tsx
import { getPackagesByFilter } from '@/lib/pricing-api';
import { PricingFilters } from '@/types/pricing';
import PackageCard from './PackageCard';
import PackageFilter from './PackageFilter';

interface PricingSectionProps {
  filters: PricingFilters;
  language?: 'en' | 'ar';
}

export default async function PricingSection({ 
  filters, 
  language = 'en' 
}: PricingSectionProps) {
  // Server-side data fetching
  const packages = await getPackagesByFilter(filters, language);

  if (packages.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">No Packages Available</h2>
          <p className="text-gray-600">
            We don't have any packages available for your selected criteria.
            Please try different filters or contact us directly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Choose Your Perfect Tutoring Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized learning experiences tailored to your curriculum and grade level.
            All packages include certified tutors and progress tracking.
          </p>
        </div>

        {/* Filter Component */}
        <PackageFilter 
          initialPackages={packages}
          userCountry={filters.country}
          language={language}
        />

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {packages.map(pkg => (
            <PackageCard 
              key={pkg.id}
              package={pkg}
              userCountry={filters.country}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 6. Package Card Component
```typescript
// src/components/pricing/PackageCard.tsx
import { TutoringPackage } from '@/types/pricing';
import { formatPrice, getCurrencySymbol } from '@/utils/pricing-helpers';

interface PackageCardProps {
  package: TutoringPackage;
  userCountry: string;
  language?: 'en' | 'ar';
}

export default function PackageCard({ 
  package: pkg, 
  userCountry, 
  language = 'en' 
}: PackageCardProps) {
  const userPrice = pkg.pricing[userCountry];
  
  if (!userPrice) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Package Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
        <div className="text-center">
          <div className="text-3xl font-bold">
            {getCurrencySymbol(userPrice.currency)}{userPrice.price}
          </div>
          <div className="text-blue-100 text-sm">
            per session ({pkg.sessionDuration})
          </div>
        </div>
      </div>

      {/* Package Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        
        {/* Package Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-semibold text-gray-700">Sessions/Week</div>
            <div className="text-lg font-bold text-blue-600">{pkg.sessionsPerWeek}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-semibold text-gray-700">Duration</div>
            <div className="text-lg font-bold text-blue-600">{pkg.sessionDuration}</div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="space-y-3 mb-6">
          <div>
            <span className="text-sm font-semibold text-gray-700">Grades: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {pkg.grades.slice(0, 3).map(grade => (
                <span key={grade} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {grade}
                </span>
              ))}
              {pkg.grades.length > 3 && (
                <span className="text-xs text-gray-500">+{pkg.grades.length - 3} more</span>
              )}
            </div>
          </div>
          
          <div>
            <span className="text-sm font-semibold text-gray-700">Subjects: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {pkg.subjects.slice(0, 2).map(subject => (
                <span key={subject} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {subject}
                </span>
              ))}
              {pkg.subjects.length > 2 && (
                <span className="text-xs text-gray-500">+{pkg.subjects.length - 2} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">What's Included:</h4>
          <ul className="space-y-2">
            {pkg.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
            {pkg.features.length > 4 && (
              <li className="text-xs text-gray-500 ml-6">
                +{pkg.features.length - 4} more features
              </li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            Book Free Trial
          </button>
          <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 7. Client Filter Component
```typescript
// src/components/pricing/PackageFilter.tsx
"use client";
import { useState, useEffect } from 'react';
import { TutoringPackage } from '@/types/pricing';

interface PackageFilterProps {
  initialPackages: TutoringPackage[];
  userCountry: string;
  language?: 'en' | 'ar';
  onFilterChange?: (packages: TutoringPackage[]) => void;
}

export default function PackageFilter({ 
  initialPackages, 
  userCountry, 
  language = 'en',
  onFilterChange 
}: PackageFilterProps) {
  const [filteredPackages, setFilteredPackages] = useState(initialPackages);
  const [filters, setFilters] = useState({
    grade: '',
    subject: '',
    curriculum: ''
  });

  // Extract unique options
  const gradeOptions = [...new Set(initialPackages.flatMap(pkg => pkg.grades))].sort();
  const subjectOptions = [...new Set(initialPackages.flatMap(pkg => pkg.subjects))].sort();
  const curriculumOptions = [...new Set(initialPackages.flatMap(pkg => pkg.curriculum))].sort();

  useEffect(() => {
    const filtered = initialPackages.filter(pkg => {
      if (filters.grade && !pkg.grades.includes(filters.grade)) return false;
      if (filters.subject && !pkg.subjects.includes(filters.subject)) return false;
      if (filters.curriculum && !pkg.curriculum.includes(filters.curriculum)) return false;
      return true;
    });
    
    setFilteredPackages(filtered);
    onFilterChange?.(filtered);
  }, [filters, initialPackages, onFilterChange]);

  const clearFilters = () => {
    setFilters({ grade: '', subject: '', curriculum: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade Level
          </label>
          <select 
            value={filters.grade}
            onChange={(e) => setFilters({...filters, grade: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Grades</option>
            {gradeOptions.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select 
            value={filters.subject}
            onChange={(e) => setFilters({...filters, subject: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Subjects</option>
            {subjectOptions.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Curriculum
          </label>
          <select 
            value={filters.curriculum}
            onChange={(e) => setFilters({...filters, curriculum: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Curricula</option>
            {curriculumOptions.map(curriculum => (
              <option key={curriculum} value={curriculum}>{curriculum}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing <span className="font-semibold">{filteredPackages.length}</span> package{filteredPackages.length !== 1 ? 's' : ''} 
        {userCountry && (
          <span> available in <span className="font-semibold">{userCountry}</span></span>
        )}
      </div>
    </div>
  );
}
```

### 8. Country Selector Component
```typescript
// src/components/pricing/CountrySelector.tsx
"use client";
import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const SUPPORTED_COUNTRIES = [
  { code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED' },
  { code: 'Saudi Arabia', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR' },
  { code: 'Qatar', name: 'Qatar', flag: '🇶🇦', currency: 'QAR' },
  { code: 'Kuwait', name: 'Kuwait', flag: '🇰🇼', currency: 'KWD' },
  { code: 'USA', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { code: 'Canada', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
];

interface CountrySelectorProps {
  currentCountry: string;
  className?: string;
}

export default function CountrySelector({ currentCountry, className = '' }: CountrySelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState(currentCountry);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setCookie('user-country', country, { maxAge: 30 * 24 * 60 * 60 }); // 30 days
    setIsOpen(false);
    
    // Refresh the page to show new pricing
    router.refresh();
  };

  const currentCountryInfo = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg">{currentCountryInfo?.flag}</span>
        <span className="font-medium">{currentCountryInfo?.code}</span>
        <span className="text-sm text-gray-500">({currentCountryInfo?.currency})</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {SUPPORTED_COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedCountry === country.code ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{country.name}</div>
                    <div className="text-sm text-gray-500">Prices in {country.currency}</div>
                  </div>
                  {selectedCountry === country.code && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

### 9. Main Page Implementation
```typescript
// src/app/pricing/page.tsx
import { Metadata } from 'next';
import { getUserCountryFromHeaders } from '@/utils/geo-helpers';
import PricingSection from '@/components/pricing/PricingSection';
import CountrySelector from '@/components/pricing/CountrySelector';

export const metadata: Metadata = {
  title: 'Tutoring Packages & Pricing | Your Company',
  description: 'Choose from our flexible tutoring packages designed for different curricula and grade levels. Personalized learning with certified tutors.',
  keywords: 'tutoring, education, online learning, IGCSE, A-levels, curriculum',
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PricingPage({ searchParams }: PageProps) {
  // Get user country from headers or cookies
  const detectedCountry = getUserCountryFromHeaders();
  
  // Parse URL filters
  const filters = {
    grade: searchParams.grade as string || '',
    subject: searchParams.subject as string || '',
    curriculum: searchParams.curriculum as string || '',
    country: detectedCountry,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Tutoring Package
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert tutoring tailored to your curriculum, grade level, and learning goals.
              Join thousands of students achieving academic excellence.
            </p>
            
            {/* Country Selector */}
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-sm text-blue-100 mb-2">Viewing prices for:</div>
                <CountrySelector 
                  currentCountry={filters.country}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection filters={filters} />

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Students Worldwide</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Students Tutored</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Curricula Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## 🚀 Quick Start Commands

1. **Install Dependencies:**
```bash
npm install firebase cookies-next
```

2. **Create Environment Variables:**
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

3. **Copy Files:**
Copy all the code above into the respective files in your project structure.

4. **Update Firebase Config:**
Replace the Firebase configuration in `src/lib/firebase.ts` with your actual config.

5. **Style with Your CSS Framework:**
The components use Tailwind classes. Replace with your CSS framework classes.

---

## 🎨 Customization Options

### Styling
- Replace Tailwind classes with your CSS framework
- Customize colors, fonts, and spacing to match your brand
- Add animations and transitions

### Features
- Add booking functionality
- Integrate with payment systems
- Add package comparison tool
- Include testimonials and reviews

### Performance
- Add loading states
- Implement skeleton screens
- Add error boundaries
- Use React.memo for optimization

---

## 🔧 Advanced Features to Add

1. **A/B Testing:** Test different package layouts
2. **Analytics:** Track which packages are most viewed/selected
3. **Personalization:** Show recommended packages based on user behavior
4. **Reviews:** Add student reviews for each package
5. **Booking Flow:** Direct integration with booking system

---

## 📞 Support & Maintenance

- Monitor Firebase usage and costs
- Update package data through your CMS
- Add new countries/currencies as needed
- Regular performance optimization

This guide provides everything needed to implement a production-ready pricing component that automatically syncs with your CMS data! 🎉