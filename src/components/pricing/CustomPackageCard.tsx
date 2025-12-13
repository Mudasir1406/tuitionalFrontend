import React from 'react';
import { Button, Typography } from '@mui/material';
import { leagueSpartan } from '@/app/fonts';
import styles from './CustomPackageCard.module.css';

interface CustomPackageCardProps {
  baseRate: number;
  currency: string;
  onBuildPackage?: () => void;
  onLearnMore?: () => void;
}

const CustomPackageCard: React.FC<CustomPackageCardProps> = ({
  baseRate,
  currency,
  onBuildPackage,
  onLearnMore
}) => {
  const features = [
    "1-on-1 personalized sessions",
    "Flexible scheduling",
    "Progress tracking included",
    "All subjects available",
    "Money-back guarantee"
  ];

  return (
    <div className={styles.card}>
      {/* Special Badge */}
      <div className={styles.customBadge}>
        <Typography className={`${styles.badgeText} ${leagueSpartan.className}`}>
          ⚡ CUSTOM PLAN
        </Typography>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <Typography variant="h5" className={`${styles.packageTitle} ${leagueSpartan.className}`}>
          Build Your Package
        </Typography>
        <Typography className={`${styles.description} ${leagueSpartan.className}`}>
          Design your perfect tutoring experience with complete flexibility and personalization.
        </Typography>
      </div>

      {/* Price Section */}
      <div className={styles.priceSection}>
        <Typography className={`${styles.startingText} ${leagueSpartan.className}`}>
          Starting from
        </Typography>
        <div className={`${styles.price} ${leagueSpartan.className}`}>
          <span className={styles.currency}>{currency}</span>
          <span className={styles.amount}>{baseRate}</span>
        </div>
        <Typography className={`${styles.period} ${leagueSpartan.className}`}>
          per hour
        </Typography>
        <Typography className={`${styles.customText} ${leagueSpartan.className}`}>
          Build exactly what you need
        </Typography>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Key Features */}
        <div className={styles.features}>
          <ul className={styles.featuresList}>
            {features.map((feature, idx) => (
              <li key={idx} className={`${styles.featureItem} ${leagueSpartan.className}`}>
                <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Button
            variant="contained"
            fullWidth
            className={`${styles.primaryButton} ${leagueSpartan.className}`}
            onClick={onBuildPackage}
          >
            Build Your Package
          </Button>
          <Typography className={`${styles.guarantee} ${leagueSpartan.className}`}>
            🔒 Free consultation included
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CustomPackageCard;