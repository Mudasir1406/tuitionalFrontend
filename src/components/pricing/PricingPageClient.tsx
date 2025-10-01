"use client";
import React, { useState, useEffect, memo } from "react";
import { Container, Typography } from "@mui/material";
import useGeoLocation from "@/utils/slugHelper";
import { mapApiCountryToPricing, SUPPORTED_COUNTRIES } from "@/utils/pricing-helpers";
import { leagueSpartan } from "@/app/fonts";
import dynamic from "next/dynamic";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";
import styles from "../../app/pricing/pricing.module.css";

// Lazy load below-the-fold components
const PricingSection = dynamic(
  () => import("./PricingSection"),
  {
    ssr: true,
    loading: () => (
      <Container maxWidth="lg">
        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Loading packages...</Typography>
        </div>
      </Container>
    )
  }
);

// Lazy load trust section for better performance
const TrustSection = React.lazy(() =>
  Promise.resolve({
    default: () => (
      <section className={styles.trustSection}>
        <Container maxWidth="lg">
          <div className={styles.trustContent}>
            <div className={styles.trustHeader}>
              <Typography variant="h3" className={`${styles.trustTitle} ${leagueSpartan.className}`}>
                Trusted by Students Worldwide
              </Typography>
              <Typography className={`${styles.trustSubtitle} ${leagueSpartan.className}`}>
                Join thousands of successful students who have achieved their academic goals with our expert tutoring
              </Typography>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🎓</div>
                <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>10,000+</Typography>
                <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                  Students Tutored
                </Typography>
                <div className={styles.statProgress}>
                  <div className={styles.progressBar} style={{width: '90%'}}></div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>👨‍🏫</div>
                <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>500+</Typography>
                <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                  Expert Tutors
                </Typography>
                <div className={styles.statProgress}>
                  <div className={styles.progressBar} style={{width: '85%'}}></div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>📚</div>
                <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>15+</Typography>
                <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                  Curricula Supported
                </Typography>
                <div className={styles.statProgress}>
                  <div className={styles.progressBar} style={{width: '75%'}}></div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>⭐</div>
                <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>98%</Typography>
                <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                  Student Satisfaction
                </Typography>
                <div className={styles.statProgress}>
                  <div className={styles.progressBar} style={{width: '98%'}}></div>
                </div>
              </div>
            </div>

            {/* Achievement badges */}
               <div className={styles.achievementBadges}>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>🏆</span>
                <span className={`${styles.badgeText} ${leagueSpartan.className}`}>Top Rated Platform</span>
              </div>
                <div className={styles.badge}>
                <span className={styles.badgeIcon}>🌟</span>
                <span className={`${styles.badgeText} ${leagueSpartan.className}`}>Award Winning</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>🔒</span>
                <span className={`${styles.badgeText} ${leagueSpartan.className}`}>Secure & Trusted</span>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>💯</span>
                <span className={`${styles.badgeText} ${leagueSpartan.className}`}>Results Guaranteed</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  })
);

interface PricingPageClientProps {
  initialFilters: {
    grade?: string;
    subject?: string;
    curriculum?: string;
    country: string;
  };
  dropdownOptions: DropdownOptions;
  locale?: string;
}

const PricingPageClient: React.FC<PricingPageClientProps> = memo(({
  initialFilters,
  dropdownOptions,
  locale = "en",
}) => {
  const [filters, setFilters] = useState(initialFilters);
  const geoData = useGeoLocation();

  // Update country when geolocation data is available
  useEffect(() => {
    if (!geoData.isLoading && !geoData.error && geoData.country) {
      const mappedCountry = mapApiCountryToPricing(geoData.country);

      // Check if the mapped country is in the supported countries list
      const isSupported = SUPPORTED_COUNTRIES.some(
        (c) => c.code === mappedCountry || c.name === mappedCountry || c.dbKey === mappedCountry
      );

      // Use detected country if supported, otherwise default to USA (database key)
      const finalCountry = isSupported ? mappedCountry : "USA";

      if (finalCountry !== filters.country) {
        setFilters((prev) => ({
          ...prev,
          country: finalCountry,
        }));
      }
    }
  }, [geoData]);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Container maxWidth="lg">
          <div className={styles.heroContent}>
            <Typography variant="h1" className={`${styles.heroTitle} ${leagueSpartan.className}`}>
              Find Your Perfect Tutoring Package
            </Typography>
            <Typography className={`${styles.heroSubtitle} ${leagueSpartan.className}`}>
              Expert tutoring tailored to your curriculum, grade level, and
              learning goals. Join thousands of students achieving academic
              excellence with our personalized approach.
            </Typography>
          </div>
        </Container>
      </section>

      {/* Pricing Section with Dynamic Filters */}
      <PricingSection
        filters={filters}
        dropdownOptions={dropdownOptions}
        locale={locale}
      />

      {/* Lazy load trust section */}
      <React.Suspense fallback={
        <div style={{ minHeight: '400px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Loading testimonials...</Typography>
        </div>
      }>
        <TrustSection />
      </React.Suspense>
    </>
  );
});

PricingPageClient.displayName = 'PricingPageClient';

export default PricingPageClient;
