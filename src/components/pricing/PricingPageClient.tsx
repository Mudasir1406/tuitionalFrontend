"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import useGeoLocation from "@/utils/slugHelper";
import { mapApiCountryToPricing } from "@/utils/pricing-helpers";
import { leagueSpartan } from "@/app/fonts";
import CountrySelector from "./CountrySelector";
import PricingSection from "./PricingSection";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";
import styles from "../../app/pricing/pricing.module.css";

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

const PricingPageClient: React.FC<PricingPageClientProps> = ({
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
      if (mappedCountry !== filters.country) {
        setFilters((prev) => ({
          ...prev,
          country: mappedCountry,
        }));
      }
    }
  }, [geoData]);

  const handleCountryChange = (newCountry: string) => {
    setFilters((prev) => ({
      ...prev,
      country: newCountry,
    }));
  };

  return (
    <>
      {/* Hero Section with Dynamic Country */}
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

            {/* Country Selector */}
            <div className={styles.countrySection}>
              <div className={styles.countryBox}>
                <Typography className={`${styles.countryLabel} ${leagueSpartan.className}`}>
                  Viewing prices for:
                </Typography>
                <CountrySelector
                  currentCountry={filters.country}
                  onCountryChange={handleCountryChange}
                  className={styles.countrySelector}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Section with Dynamic Filters */}
      <PricingSection
        filters={filters}
        dropdownOptions={dropdownOptions}
        locale={locale}
      />

      {/* Enhanced Trust Section */}
      <section className={styles.trustSection}>
        <Container maxWidth="lg">
          <div className={styles.trustHeader}>
            <Typography variant="h3" className={`${styles.trustTitle} ${leagueSpartan.className}`}>
              Trusted by Students Worldwide
            </Typography>
            <Typography className={`${styles.trustSubtitle} ${leagueSpartan.className}`}>
              Join thousands of successful students who have transformed their academic journey with our proven tutoring methods
            </Typography>
          </div>

          <div className={styles.statsGrid}>
            <div className={`${styles.statItem} ${styles.statItemAnimated}`}>
              <div className={styles.statIcon}>🎓</div>
              <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>10,000+</Typography>
              <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                Students Tutored
              </Typography>
              <Typography className={`${styles.statDescription} ${leagueSpartan.className}`}>
                Across 25+ countries
              </Typography>
            </div>
            <div className={`${styles.statItem} ${styles.statItemAnimated}`}>
              <div className={styles.statIcon}>👨‍🏫</div>
              <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>500+</Typography>
              <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                Expert Tutors
              </Typography>
              <Typography className={`${styles.statDescription} ${leagueSpartan.className}`}>
                Qualified & certified
              </Typography>
            </div>
            <div className={`${styles.statItem} ${styles.statItemAnimated}`}>
              <div className={styles.statIcon}>📚</div>
              <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>15+</Typography>
              <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                Curricula Supported
              </Typography>
              <Typography className={`${styles.statDescription} ${leagueSpartan.className}`}>
                IGCSE, A-Level & more
              </Typography>
            </div>
            <div className={`${styles.statItem} ${styles.statItemAnimated}`}>
              <div className={styles.statIcon}>⭐</div>
              <Typography className={`${styles.statNumber} ${leagueSpartan.className}`}>98%</Typography>
              <Typography className={`${styles.statLabel} ${leagueSpartan.className}`}>
                Student Satisfaction
              </Typography>
              <Typography className={`${styles.statDescription} ${leagueSpartan.className}`}>
                Grade improvement rate
              </Typography>
            </div>
          </div>

          {/* Success Stories Highlight */}
          <div className={styles.successHighlight}>
            <Typography className={`${styles.successText} ${leagueSpartan.className}`}>
              "Students typically see a 2-grade improvement within 3 months"
            </Typography>
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>✓ Verified Reviews</span>
              <span className={styles.trustBadge}>✓ Money-Back Guarantee</span>
              <span className={styles.trustBadge}>✓ 24/7 Support</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PricingPageClient;
