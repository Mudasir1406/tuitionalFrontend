import React from 'react';
import { Metadata } from 'next';
import PricingPageClient from '@/components/pricing/PricingPageClient';
import { mapApiCountryToPricing } from '@/utils/pricing-helpers';
import { getDropdownOptions } from '@/services/dropdown/dropdown-api';
import styles from './pricing.module.css';

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
    country: searchParams.country || 'United Arab Emirates', // Default fallback
  };

  // Fetch dropdown options server-side for SSR
  const dropdownOptions = await getDropdownOptions('en');

  return (
    <main className={styles.main}>
      <PricingPageClient
        initialFilters={initialFilters}
        dropdownOptions={dropdownOptions}
      />
    </main>
  );
}