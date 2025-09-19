"use client";
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Typography } from '@mui/material';
import { SUPPORTED_COUNTRIES, getCountryInfo, mapApiCountryToPricing, mapPricingToDisplayCountry } from '@/utils/pricing-helpers';
import styles from './CountrySelector.module.css';

interface CountrySelectorProps {
  currentCountry: string;
  onCountryChange?: (country: string) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  currentCountry, 
  onCountryChange,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'down' | 'up'>('down');
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Convert Firebase format to display format for the selector
  const displayCountry = mapPricingToDisplayCountry(currentCountry);
  const [selectedCountry, setSelectedCountry] = useState(displayCountry);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setIsOpen(false);
    // Map the full country name to Firebase format before passing it up
    const mappedCountry = mapApiCountryToPricing(countryCode);
    onCountryChange?.(mappedCountry);
  };

  const handleToggleOpen = () => {
    if (!isOpen && containerRef.current) {
      // Calculate dropdown position and store container rect
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = Math.min(350, SUPPORTED_COUNTRIES.length * 60); // Estimate dropdown height
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('up');
      } else {
        setDropdownPosition('down');
      }
      
      setDropdownRect(rect);
    }
    setIsOpen(!isOpen);
  };

  // Update local state when currentCountry prop changes
  React.useEffect(() => {
    const newDisplayCountry = mapPricingToDisplayCountry(currentCountry);
    setSelectedCountry(newDisplayCountry);
  }, [currentCountry]);

  // Handle scroll/resize to reposition dropdown
  React.useEffect(() => {
    if (isOpen) {
      const handleScrollResize = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setDropdownRect(rect);
        }
      };

      window.addEventListener('scroll', handleScrollResize, true);
      window.addEventListener('resize', handleScrollResize);
      
      return () => {
        window.removeEventListener('scroll', handleScrollResize, true);
        window.removeEventListener('resize', handleScrollResize);
      };
    }
  }, [isOpen]);

  const currentCountryInfo = getCountryInfo(selectedCountry);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      <button
        onClick={handleToggleOpen}
        className={styles.trigger}
      >
        <span className={styles.flag}>{currentCountryInfo.flag}</span>
        <span className={styles.countryName}>{currentCountryInfo.code}</span>
        <span className={styles.currency}>({currentCountryInfo.currency})</span>
        <svg className={styles.chevron} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && dropdownRect && createPortal(
        <>
          <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
          <div 
            className={`${styles.dropdown} ${dropdownPosition === 'up' ? styles.dropdownUp : ''}`}
            style={{
              position: 'fixed',
              left: dropdownRect.left,
              top: dropdownPosition === 'up' 
                ? dropdownRect.top - 8 
                : dropdownRect.bottom + 8,
              width: dropdownRect.width,
              minWidth: '280px',
              transform: dropdownPosition === 'up' ? 'translateY(-100%)' : 'none'
            }}
          >
            <div className={styles.dropdownContent}>
              {SUPPORTED_COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountryChange(country.code)}
                  className={`${styles.option} ${
                    selectedCountry === country.code ? styles.optionSelected : ''
                  }`}
                >
                  <span className={styles.optionFlag}>{country.flag}</span>
                  <div className={styles.optionInfo}>
                    <Typography className={styles.optionName}>
                      {country.name}
                    </Typography>
                    <Typography className={styles.optionCurrency}>
                      Prices in {country.currency}
                    </Typography>
                  </div>
                  {selectedCountry === country.code && (
                    <svg className={styles.checkIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default CountrySelector;