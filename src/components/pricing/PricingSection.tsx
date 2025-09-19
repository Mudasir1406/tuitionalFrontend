"use client";
import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { getPricingPageData } from '@/services/pricing/pricing-api';
import { PricingFilters } from '@/types/pricing';
import { DropdownOptions } from '@/services/dropdown/dropdown-api';
import { leagueSpartan } from '@/app/fonts';
import PackageCard from './PackageCard';
import CustomPricingModal from './CustomPricingModal';
import PricingFilter from './PricingFilter';
import styles from './PricingSection.module.css';

interface PricingSectionProps {
  filters: PricingFilters;
  dropdownOptions: DropdownOptions;
  locale?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  filters,
  dropdownOptions,
  locale = 'en'
}) => {

  const [pricingData, setPricingData] = React.useState<any>(null);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [sessionType, setSessionType] = React.useState<'online' | 'custom'>('online');

  // Auto-open modal when switching to custom tab
  const handleTabChange = (newSessionType: 'online' | 'custom') => {
    setSessionType(newSessionType);
    if (newSessionType === 'custom') {
      setIsModalOpen(true);
    }
  };

  // Handle modal close - optionally reset to online tab for better UX
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Uncomment the line below if you want to auto-switch back to online tab when modal closes
    // setSessionType('online');
  };

  React.useEffect(() => {
    const loadData = async () => {
      console.log('filters changed, loading data:', filters);
      try {
        setIsLoading(true);
        const data = await getPricingPageData(filters, locale);
        console.log('Pricing data loaded:', data.packages.length, 'packages');
        setPricingData(data);
        setHasError(false);
      } catch (error) {
        console.error('Error loading pricing data:', error);
        setHasError(true);
        // Set empty structure to trigger fallback
        setPricingData({
          packages: [],
          filterOptions: { grades: [], subjects: [], curricula: [], countries: [] }
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filters, locale]);

  // Loading state
  if (isLoading) {
    return (
      <section className={styles.container}>
        <Container maxWidth="lg">
          <div className={styles.loadingContent}>
            <Typography>Loading packages...</Typography>
          </div>
        </Container>
      </section>
    );
  }

  // This should not happen due to fallback data, but extra safety
  if (!pricingData || pricingData.packages.length === 0) {
    return (
      <section className={styles.container}>
        <Container maxWidth="lg">
          <div className={styles.noPackages}>
            <Typography variant="h4" className={styles.noPackagesTitle}>
              {hasError ? 'Service Temporarily Unavailable' : 'No Packages Available'}
            </Typography>
            <Typography className={styles.noPackagesDesc}>
              {hasError 
                ? 'We are experiencing technical difficulties. Please try again later or contact our support team.'
                : 'We don\'t have any packages available for your selected criteria. Please try different filters or contact us directly.'
              }
            </Typography>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Container maxWidth="lg">
        {/* New Header with Toggle */}
        <div className={styles.header}>
          <Typography variant="h2" className={`${styles.title} ${leagueSpartan.className}`}>
            Our packages
          </Typography>

          {/* Session Type Toggle */}
          <div className={styles.toggleContainer}>
            <div className={styles.toggleWrapper}>
              <Button
                className={`${styles.toggleButton} ${sessionType === 'online' ? styles.toggleActive : ''} ${leagueSpartan.className}`}
                onClick={() => handleTabChange('online')}
              >
                Online Sessions (Save up to 30%)
              </Button>
              <Button
                className={`${styles.toggleButton} ${sessionType === 'custom' ? styles.toggleActive : ''} ${leagueSpartan.className}`}
                onClick={() => handleTabChange('custom')}
              >
                Custom Package Builder
              </Button>
            </div>
          </div>
        </div>

        {/* Remove the old filter for now - focusing on clean design */}
        {/* <PricingFilter
          initialPackages={pricingData.packages}
          filterOptions={pricingData.filterOptions}
          userCountry={filters.country}
          locale={locale}
        /> */}

        {/* Packages Grid - Show only for online sessions */}
        {sessionType === 'online' ? (
          <div className={styles.packagesGrid}>
            {pricingData.packages.slice(0, 3).map((pkg: any, index: number) => (
              <div key={pkg.id} className={styles.packageCardWrapper}>
                <PackageCard
                  package={pkg}
                  userCountry={filters.country}
                  locale={locale}
                  isPopular={index === 1} // Make the middle card popular with brand color
                  sessionType={sessionType}
                />
              </div>
            ))}
          </div>
        ) : (
          // Custom tab selected - show helpful message since modal opens automatically
          <div className={styles.customPlaceholder}>
            <div className={styles.customMessage}>
              <Typography variant="h4" className={`${styles.customTitle} ${leagueSpartan.className}`}>
                🎯 Custom Package Builder
              </Typography>
              <Typography className={`${styles.customDescription} ${leagueSpartan.className}`}>
                Configure your perfect tutoring package with flexible hours, subjects, and pricing tiers.
                The builder will open automatically.
              </Typography>
              {!isModalOpen && (
                <Button
                  variant="contained"
                  className={`${styles.reopenButton} ${leagueSpartan.className}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Package Builder
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Custom Pricing Modal */}
        <CustomPricingModal
          open={isModalOpen}
          onClose={handleModalClose}
          userCountry={filters.country}
          dropdownOptions={dropdownOptions}
        />

      </Container>
    </section>
  );
};

export default PricingSection;