import React, { memo, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { TutoringPackage } from "@/types/pricing";
import { getCurrencySymbol } from "@/utils/pricing-helpers";
import { leagueSpartan } from "@/app/fonts";
import styles from "./PackageCard.module.css";

interface PackageCardProps {
  package: TutoringPackage;
  userCountry: string;
  locale?: string;
  isPopular?: boolean;
  sessionType?: "online" | "offline";
}

const PackageCard: React.FC<PackageCardProps> = memo(({
  package: pkg,
  userCountry,
  locale = "en",
  isPopular = false,
  sessionType = "online",
}) => {
  const userPrice = pkg.pricing[userCountry];

  // Memoize expensive pricing calculations
  const { displayPrice, monthlyPrice, currencySymbol, basePrice, discount } = useMemo(() => {
    if (!userPrice) {
      // Return default values when userPrice is null
      return {
        displayPrice: 0,
        monthlyPrice: 0,
        currencySymbol: "",
        basePrice: 0,
        discount: 0
      };
    }

    const calculatedBasePrice = userPrice.price;
    const discountPercent = pkg.discountPercentage || 0; // Use database discount or 0
    const calculatedDisplayPrice = sessionType === "online" && discountPercent > 0
      ? Math.round(calculatedBasePrice * (1 - discountPercent / 100))
      : calculatedBasePrice;
    const calculatedMonthlyPrice = calculatedDisplayPrice * pkg.sessionsPerWeek * 4;
    const symbol = getCurrencySymbol(userPrice.currency);

    return {
      displayPrice: calculatedDisplayPrice,
      monthlyPrice: calculatedMonthlyPrice,
      currencySymbol: symbol,
      basePrice: calculatedBasePrice,
      discount: discountPercent
    };
  }, [userPrice, sessionType, pkg.sessionsPerWeek, pkg.discountPercentage]);

  if (!userPrice) return null;

  return (
    <div className={`${styles.card} ${isPopular ? styles.popular : ""}`}>
      {/* Package Name */}
      <div className={styles.header}>
        <Typography
          className={`${styles.packageTitle} ${leagueSpartan.className}`}
        >
          {pkg.name}
        </Typography>
      </div>

      {/* Price Section */}
      <div className={styles.priceSection}>
        <div className={styles.priceContainer}>
          <span className={`${styles.currency} ${leagueSpartan.className}`}>
            {currencySymbol}
          </span>
          <span className={`${styles.amount} ${leagueSpartan.className}`}>
            {displayPrice}
          </span>
        </div>
        <Typography className={`${styles.period} ${leagueSpartan.className}`}>
          per session
        </Typography>
        {sessionType === "online" && basePrice !== displayPrice && discount > 0 && (
          <Typography
            className={`${styles.originalPrice} ${leagueSpartan.className}`}
          >
            <span className={styles.crossed}>
              {currencySymbol}
              {basePrice}
            </span>
            <span className={styles.savings}>Save {discount}%</span>
          </Typography>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Key Features */}
        <div className={styles.features}>
          {/* <div className={`${styles.featureItem} ${leagueSpartan.className}`}>
            <span className={styles.checkIcon}>✓</span>
            <span>{pkg.sessionsPerWeek} sessions per week</span>
          </div>
          <div className={`${styles.featureItem} ${leagueSpartan.className}`}>
            <span className={styles.checkIcon}>✓</span>
            <span>{pkg.sessionDuration} per session</span>
          </div> */}
          {pkg.features?.slice(0,4)?.map((feature, idx) => (
            <div
              key={idx}
              className={`${styles.featureItem} ${leagueSpartan.className}`}
            >
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
            className={`${styles.actionButton} ${
              isPopular ? styles.popularButton : ""
            } ${leagueSpartan.className}`}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
});

PackageCard.displayName = 'PackageCard';

export default PackageCard;
