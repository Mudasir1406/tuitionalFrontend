"use client";
import React, { useState } from 'react';
import { Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SUPPORTED_COUNTRIES, getCountryInfo, mapApiCountryToPricing, mapPricingToDisplayCountry } from '@/utils/pricing-helpers';
import styles from './CountrySelector.module.css';

interface ArCountrySelectorProps {
  currentCountry: string;
  onCountryChange: (country: string) => void;
  className?: string;
}

const ArCountrySelector: React.FC<ArCountrySelectorProps> = ({
  currentCountry,
  onCountryChange,
  className
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCountry = event.target.value as string;
    onCountryChange(selectedCountry);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get display country name (for showing in selector)
  const displayCountry = mapPricingToDisplayCountry(currentCountry);
  const countryInfo = getCountryInfo(displayCountry);

  return (
    <FormControl className={`${styles.formControl} ${className || ''}`}>
      <Select
        value={currentCountry}
        onChange={handleChange}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        IconComponent={KeyboardArrowDownIcon}
        className={styles.select}
        MenuProps={{
          PaperProps: {
            className: styles.menuPaper,
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
      >
        {SUPPORTED_COUNTRIES.map((country) => {
          const pricingKey = mapApiCountryToPricing(country.dbKey || country.code);
          
          return (
            <MenuItem
              key={country.dbKey || country.code}
              value={pricingKey}
              className={styles.menuItem}
            >
              <div className={styles.countryOption}>
                <span className={styles.flag}>{country.flag}</span>
                <span className={styles.countryName}>{country.nameAr}</span>
              </div>
            </MenuItem>
          );
        })}
      </Select>

      {/* Display current selection */}
      <div className={styles.currentSelection}>
        <span className={styles.currentFlag}>{countryInfo.flag}</span>
        <span className={styles.currentCountryName}>{countryInfo.nameAr}</span>
      </div>
    </FormControl>
  );
};

export default ArCountrySelector;