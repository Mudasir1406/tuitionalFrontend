import React from 'react';
import { Metadata } from 'next';
import { getDropdownOptions } from '@/services/dropdown/dropdown-api';
import ArHeader from '@/components/ar-header';
import dynamic from 'next/dynamic';
import { SITE_URL } from '@/utils/env';
import styles from '../../pricing/pricing.module.css';

// Lazy load heavy components
const ArPricingPageClient = dynamic(
  () => import('@/components/pricing/ArPricingPageClient'),
  {
    ssr: true,
    loading: () => (
      <div className={styles.main}>
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>جاري تحميل باقات التدريس...</div>
        </div>
      </div>
    )
  }
);

const ArServerFooter = dynamic(
  () => import('@/components/ar-server-footer'),
  {
    ssr: false,
    loading: () => <div style={{ height: '400px', backgroundColor: '#f5f5f5' }} />
  }
);

// Generate dynamic metadata
export const metadata: Metadata = {
  title: 'باقات وأسعار التدريس | تيوشنال',
  description: 'اختر من بين باقات التدريس المرنة المصممة لمناهج ومستويات دراسية مختلفة. تعلم شخصي مع مدرسين معتمدين بأسعار تنافسية.',
  keywords: 'باقات التدريس, أسعار التدريس عبر الإنترنت, تدريس IGCSE, تدريس A-levels, التعلم القائم على المنهج',
  alternates: {
    canonical: `${SITE_URL}/ar/pricing`,
  },
  openGraph: {
    title: 'باقات وأسعار التدريس | تيوشنال',
    description: 'اعثر على باقة التدريس المثالية لأهدافك الأكاديمية. مدرسون خبراء، جدولة مرنة، وأسعار تنافسية.',
    type: 'website',
  },
};

interface SearchParams {
  grade?: string;
  subject?: string;
  curriculum?: string;
  country?: string;
}

interface PageProps {
  searchParams: SearchParams;
}

export default async function ArPricingPage({ searchParams }: PageProps) {
  // Parse URL filters with defaults (will be overridden by geolocation)
  const initialFilters = {
    grade: searchParams.grade || '',
    subject: searchParams.subject || '',
    curriculum: searchParams.curriculum || '',
    country: searchParams.country || 'USA', // Default fallback (matches database key)
  };

  // Fetch dropdown options server-side for SSR
  const dropdownOptions = await getDropdownOptions('en');

  return (
    <div dir="rtl">
      <ArHeader />
      <main className={styles.main}>
        <ArPricingPageClient
          initialFilters={initialFilters}
          dropdownOptions={dropdownOptions}
          locale="ar"
        />
      </main>
      <ArServerFooter />
    </div>
  );
}