import React from 'react';
import { Metadata } from 'next';
import { getDropdownOptions } from '@/services/dropdown/dropdown-api';
import { Header } from '@/components';
import dynamic from 'next/dynamic';
import styles from './pricing.module.css';

// Lazy load heavy components
const PricingPageClient = dynamic(
  () => import('@/components/pricing/PricingPageClient'),
  {
    ssr: true,
    loading: () => (
      <div className={styles.main}>
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>Loading pricing packages...</div>
        </div>
      </div>
    )
  }
);

const Footer = dynamic(
  () => import('@/components/footer-wrapper'),
  {
    ssr: false,
    loading: () => <div style={{ height: '400px', backgroundColor: '#f5f5f5' }} />
  }
);

// Generate dynamic metadata
export const metadata: Metadata = {
  title: 'Tutoring Packages & Pricing | Tuitional',
  description: 'Choose from our flexible tutoring packages designed for different curricula and grade levels. Personalized learning with certified tutors at competitive prices.',
  keywords: 'tutoring packages, online tutoring prices, IGCSE tutoring, A-levels tutoring, curriculum-based learning',
  openGraph: {
    title: 'Tutoring Packages & Pricing | Tuitional',
    description: 'Find the perfect tutoring package for your academic goals. Expert tutors, flexible scheduling, and competitive pricing.',
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

export default async function PricingPage({ searchParams }: PageProps) {
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
    <>
      <Header />
      <main className={styles.main}>
        <PricingPageClient
          initialFilters={initialFilters}
          dropdownOptions={dropdownOptions}
        />
      </main>
      <Footer />
    </>
  );
}