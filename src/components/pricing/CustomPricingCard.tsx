import React from 'react';
import { Button, Typography } from '@mui/material';
import { leagueSpartan } from '@/app/fonts';
import styles from './CustomPricingCard.module.css';

interface CustomPricingCardProps {
  userCountry: string;
  onConfigureClick: () => void;
}

const CustomPricingCard: React.FC<CustomPricingCardProps> = ({
  userCountry,
  onConfigureClick
}) => {
  const features = [
    "Choose your own subjects",
    "Select grade & curriculum",
    "Flexible hours & schedule",
    "Volume discounts available",
    "Personal learning plan",
    "Progress tracking included"
  ];

  // Get currency based on country
  const getCurrency = (country: string) => {
    const currencyMap: { [key: string]: string } = {
      'United Arab Emirates': 'AED',
      'Saudi Arabia': 'SAR',
      'Qatar': 'QAR',
      'Kuwait': 'KWD',
      'United States': 'USD',
      'United Kingdom': 'GBP',
      'Canada': 'CAD'
    };
    return currencyMap[country] || 'USD';
  };

  return (
    <div className={styles.card}>
      {/* Custom Badge */}
      <div className={styles.customBadge}>
        <Typography className={`${styles.badgeText} ${leagueSpartan.className}`}>
          ⚡ CUSTOM PRICING
        </Typography>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <Typography variant="h5" className={`${styles.packageTitle} ${leagueSpartan.className}`}>
          Configure Your Package
        </Typography>
        <Typography className={`${styles.description} ${leagueSpartan.className}`}>
          Build your perfect tutoring plan with hour-based pricing and volume discounts.
        </Typography>
      </div>

      {/* Price Section */}
      <div className={styles.priceSection}>
        <Typography className={`${styles.startingText} ${leagueSpartan.className}`}>
          Starting from
        </Typography>
        <div className={`${styles.price} ${leagueSpartan.className}`}>
          <span className={styles.currency}>{getCurrency(userCountry)}</span>
          <span className={styles.amount}>50</span>
        </div>
        <Typography className={`${styles.period} ${leagueSpartan.className}`}>
          per hour
        </Typography>
        <Typography className={`${styles.customText} ${leagueSpartan.className}`}>
          Price varies by subject & volume
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
            onClick={onConfigureClick}
          >
            Configure Package
          </Button>
          <Typography className={`${styles.guarantee} ${leagueSpartan.className}`}>
            🔒 Free consultation & trial session
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CustomPricingCard;