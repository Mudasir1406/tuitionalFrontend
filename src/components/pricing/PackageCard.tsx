import React from 'react';
import { Button, Typography } from '@mui/material';
import { TutoringPackage } from '@/types/pricing';
import { getCurrencySymbol } from '@/utils/pricing-helpers';
import { leagueSpartan } from '@/app/fonts';
import styles from './PackageCard.module.css';

interface PackageCardProps {
  package: TutoringPackage;
  userCountry: string;
  locale?: string;
  isPopular?: boolean;
  sessionType?: 'online' | 'offline';
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  userCountry,
  locale = 'en',
  isPopular = false,
  sessionType = 'online'
}) => {
  const userPrice = pkg.pricing[userCountry];

  if (!userPrice) return null;

  // Calculate pricing based on session type (online has 30% discount)
  const basePrice = userPrice.price;
  const displayPrice = sessionType === 'online' ? Math.round(basePrice * 0.7) : basePrice;
  const monthlyPrice = displayPrice * pkg.sessionsPerWeek * 4;

  return (
    <div className={`${styles.card} ${isPopular ? styles.popular : ''}`}>
      {/* Package Name */}
      <div className={styles.header}>
        <Typography className={`${styles.packageTitle} ${leagueSpartan.className}`}>
          {pkg.name}
        </Typography>
      </div>

      {/* Price Section */}
      <div className={styles.priceSection}>
        <div className={styles.priceContainer}>
          <span className={`${styles.currency} ${leagueSpartan.className}`}>
            {getCurrencySymbol(userPrice.currency)}
          </span>
          <span className={`${styles.amount} ${leagueSpartan.className}`}>
            {displayPrice}
          </span>
        </div>
        <Typography className={`${styles.period} ${leagueSpartan.className}`}>
          per session
        </Typography>
        {sessionType === 'online' && basePrice !== displayPrice && (
          <Typography className={`${styles.originalPrice} ${leagueSpartan.className}`}>
            <span className={styles.crossed}>
              {getCurrencySymbol(userPrice.currency)}{basePrice}
            </span>
            <span className={styles.savings}>Save 30%</span>
          </Typography>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Key Features */}
        <div className={styles.features}>
          <div className={`${styles.featureItem} ${leagueSpartan.className}`}>
            <span className={styles.checkIcon}>✓</span>
            <span>{pkg.sessionsPerWeek} sessions per week</span>
          </div>
          <div className={`${styles.featureItem} ${leagueSpartan.className}`}>
            <span className={styles.checkIcon}>✓</span>
            <span>{pkg.sessionDuration} per session</span>
          </div>
          {pkg.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className={`${styles.featureItem} ${leagueSpartan.className}`}>
              <span className={styles.checkIcon}>✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className={styles.actions}>
          <Button
            variant="contained"
            fullWidth
            className={`${styles.actionButton} ${isPopular ? styles.popularButton : ''} ${leagueSpartan.className}`}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;