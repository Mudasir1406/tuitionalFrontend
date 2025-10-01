"use client";
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { getPricingPageData } from '@/services/pricing/pricing-api';
import { PricingFilters } from '@/types/pricing';
import { DropdownOptions } from '@/services/dropdown/dropdown-api';
import { leagueSpartan } from '@/app/fonts';
import ArPackageCard from './ArPackageCard';
import dynamic from 'next/dynamic';
import styles from './PricingSection.module.css';

// Lazy load the modal only when needed
const ArCustomPricingModal = dynamic(
  () => import('./ArCustomPricingModal'),
  {
    ssr: false,
    loading: () => null
  }
);

interface ArPricingSectionProps {
  filters: PricingFilters;
  dropdownOptions: DropdownOptions;
  locale?: string;
}

const ArPricingSection: React.FC<ArPricingSectionProps> = ({
  filters,
  dropdownOptions,
  locale = 'ar'
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

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getPricingPageData(filters, locale);
        setPricingData(data);
        setHasError(false);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading pricing data:', error);
        }
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
            <Typography>جاري تحميل الباقات...</Typography>
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
              {hasError ? 'الخدمة غير متاحة مؤقتاً' : 'لا توجد باقات متاحة'}
            </Typography>
            <Typography className={styles.noPackagesDesc}>
              {hasError
                ? 'نواجه صعوبات تقنية. يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بفريق الدعم.'
                : 'لا توجد لدينا أي باقات متاحة للمعايير المحددة. يرجى تجربة مرشحات أخرى أو الاتصال بنا مباشرة.'
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
            باقاتنا
          </Typography>

          {/* Session Type Toggle */}
          <div className={styles.toggleContainer}>
            <div className={styles.toggleWrapper}>
              <Button
                className={`${styles.toggleButton} ${sessionType === 'online' ? styles.toggleActive : ''} ${leagueSpartan.className}`}
                onClick={() => handleTabChange('online')}
              >
                جلسات عبر الإنترنت (وفر حتى 30%)
              </Button>
              <Button
                className={`${styles.toggleButton} ${sessionType === 'custom' ? styles.toggleActive : ''} ${leagueSpartan.className}`}
                onClick={() => handleTabChange('custom')}
              >
                منشئ الباقات المخصصة
              </Button>
            </div>
          </div>
        </div>

        {/* Packages Grid - Show only for online sessions */}
        {sessionType === 'online' ? (
          <div className={styles.packagesGrid}>
            {pricingData.packages
              .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
              .slice(0, 3)
              .map((pkg: any, index: number) => (
                <div key={pkg.id} className={styles.packageCardWrapper}>
                  <ArPackageCard
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
                🎯 منشئ الباقات المخصصة
              </Typography>
              <Typography className={`${styles.customDescription} ${leagueSpartan.className}`}>
                قم بتكوين باقة التدريس المثالية لك مع ساعات مرنة ومواد دراسية وفئات أسعار.
                سيتم فتح المنشئ تلقائياً.
              </Typography>
              {!isModalOpen && (
                <Button
                  variant="contained"
                  className={`${styles.reopenButton} ${leagueSpartan.className}`}
                  onClick={() => setIsModalOpen(true)}
                >
                  فتح منشئ الباقات
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Custom Pricing Modal */}
        <ArCustomPricingModal
          open={isModalOpen}
          onClose={handleModalClose}
          userCountry={filters.country}
          dropdownOptions={dropdownOptions}
        />

      </Container>
    </section>
  );
};

export default ArPricingSection;