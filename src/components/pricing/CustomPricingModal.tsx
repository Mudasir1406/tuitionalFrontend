"use client";
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Box,
  Divider
} from '@mui/material';
import { Add, Close, Delete } from '@mui/icons-material';
import { leagueSpartan } from '@/app/fonts';
import { CustomPricingSelection } from '@/types/pricing';
import { SUPPORTED_COUNTRIES, getCurrencySymbol } from '@/utils/pricing-helpers';
import { DropdownOptions } from '@/services/dropdown/dropdown-api';
import { calculateCustomPricing } from '@/services/pricing/pricing-api';
import styles from './CustomPricingModal.module.css';

interface PackageRow {
  id: string;
  country: string;
  grade: string;
  level: string;
  curriculum: string;
  subject: string;
  hours: number;
  baseRate: number;
  discountPercentage: number;
  finalRate: number;
  totalCost: number;
  originalCost: number;
  savings: number;
  isCalculating: boolean;
  calculationError?: string;
}

interface CustomPricingModalProps {
  open: boolean;
  onClose: () => void;
  userCountry: string;
  dropdownOptions: DropdownOptions;
}

const CustomPricingModal: React.FC<CustomPricingModalProps> = ({
  open,
  onClose,
  userCountry,
  dropdownOptions
}) => {
  const [rows, setRows] = useState<PackageRow[]>([]);

  // Default levels (not in dropdown collection)
  const defaultLevels = ['IGCSE', 'A-Levels', 'IB', 'SAT', 'AP'];

  // Use dropdown options from props (server-side fetched)
  const dropdownOptionsWithLevels = {
    grades: dropdownOptions.grades,
    levels: defaultLevels, // levels not in Firebase, use default
    curricula: dropdownOptions.curriculum,
    subjects: dropdownOptions.subjects,
    countries: dropdownOptions.countries
  };


  // Initialize with one row
  useEffect(() => {
    if (open && rows.length === 0) {
      addNewRow();
    }
  }, [open]);

  // Handle body scroll lock
  useEffect(() => {
    if (open) {
      // Disable body scroll
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        // Re-enable body scroll when modal closes
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  const generateRowId = () => `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addNewRow = () => {

    // Map userCountry to dropdown format if needed
    const mappedCountry = userCountry === 'United States' ? 'USA' :
                         userCountry === 'United Kingdom' ? 'UK' :
                         userCountry === 'United Arab Emirates' ? 'UAE' :
                         userCountry;

    const newRow: PackageRow = {
      id: generateRowId(),
      country: mappedCountry,
      grade: '',
      level: '',
      curriculum: '',
      subject: '',
      hours: 10,
      baseRate: 85, // Will be updated from database
      discountPercentage: 0,
      finalRate: 85,
      totalCost: 850,
      originalCost: 850,
      savings: 0,
      isCalculating: false,
      calculationError: undefined
    };
    setRows(prev => [...prev, newRow]);
  };

  const removeRow = (rowId: string) => {
    if (rows.length > 1) {
      setRows(prev => prev.filter(row => row.id !== rowId));
    }
  };

  const updateRow = (rowId: string, field: keyof PackageRow, value: any) => {
    setRows(prev => prev.map(row => {
      if (row.id === rowId) {
        const updatedRow = { ...row, [field]: value };

        // If academic fields changed, recalculate pricing from database
        if (['country', 'grade', 'level', 'curriculum', 'subject', 'hours'].includes(field)) {
          calculateRealPricing(updatedRow);
          return { ...updatedRow, isCalculating: true, calculationError: undefined };
        }

        return updatedRow;
      }
      return row;
    }));
  };

  // Real-time pricing calculation using database
  const calculateRealPricing = async (row: PackageRow) => {
    // Check if all required fields are filled
    if (!row.country || !row.grade || !row.level || !row.curriculum || !row.subject || !row.hours) {
      return;
    }

    try {
      const pricingResult = await calculateCustomPricing({
        country: row.country,
        grade: row.grade,
        level: row.level,
        curriculum: row.curriculum,
        subject: row.subject,
        hours: row.hours
      });

      // Update the row with real pricing data
      setRows(prev => prev.map(r => {
        if (r.id === row.id) {
          if (pricingResult) {
            return {
              ...r,
              baseRate: pricingResult.baseRate,
              discountPercentage: pricingResult.discountPercentage,
              finalRate: pricingResult.finalRate,
              totalCost: pricingResult.totalCost,
              originalCost: pricingResult.originalCost,
              savings: pricingResult.savings,
              isCalculating: false,
              calculationError: undefined
            };
          } else {
            // No package found for this configuration
            return {
              ...r,
              isCalculating: false,
              calculationError: 'No package available for this configuration'
            };
          }
        }
        return r;
      }));

    } catch (error) {
      console.error('🔥 Custom Pricing - Calculation error:', error);

      // Update row with error state
      setRows(prev => prev.map(r => {
        if (r.id === row.id) {
          return {
            ...r,
            isCalculating: false,
            calculationError: 'Error calculating pricing'
          };
        }
        return r;
      }));
    }
  };

  // Fallback calculation (keeping for when database fails)
  const calculateRowPricing = (row: PackageRow): PackageRow => {
    // Simple discount calculation based on hours (fallback)
    let discountPercentage = 0;
    if (row.hours >= 51) discountPercentage = 15;
    else if (row.hours >= 21) discountPercentage = 10;
    else if (row.hours >= 9) discountPercentage = 5;

    const finalRate = row.baseRate * (1 - discountPercentage / 100);
    const totalCost = finalRate * row.hours;
    const originalCost = row.baseRate * row.hours;
    const savings = originalCost - totalCost;

    return {
      ...row,
      discountPercentage,
      finalRate,
      totalCost,
      originalCost,
      savings,
      isCalculating: false,
      calculationError: undefined
    };
  };

  const getTotalCost = () => {
    return rows.reduce((total, row) => total + row.totalCost, 0);
  };

  const getTotalSavings = () => {
    return rows.reduce((total, row) => total + row.savings, 0);
  };

  const getCurrency = (country: string) => {
    // Use the dropdown options currencies mapping
    const currency = dropdownOptions.currencies?.[country];
    if (currency) return currency;

    // Fallback mapping for common country codes
    const currencyMap: { [key: string]: string } = {
      'USA': 'USD',
      'UK': 'GBP',
      'UAE': 'AED',
      'Saudi Arabia': 'SAR',
      'Qatar': 'QAR',
      'Kuwait': 'KWD',
      'Canada': 'CAD',
      'Australia': 'AUD',
      'Oman': 'OMR',
      'Bahrain': 'BHD'
    };

    return currencyMap[country] || 'USD';
  };

  const handleClose = () => {
    setRows([]);
    onClose();
  };

  const handleProceed = () => {
    // Handle booking logic here
    handleClose();
  };

  const renderRow = (row: PackageRow, index: number) => (
    <div key={row.id} className={styles.packageRow}>
      {/* Row Number */}
      <div className={styles.rowNumber}>
        <Typography className={`${styles.rowNumberText} ${leagueSpartan.className}`}>
          {index + 1}
        </Typography>
      </div>

      {/* Row Content - All in one horizontal line */}
      <div className={styles.rowContent}>
        <FormControl className={styles.dropdown} size="small">
          <InputLabel>Grade</InputLabel>
          <Select
            value={row.grade}
            label="Grade"
            onChange={(e) => updateRow(row.id, 'grade', e.target.value)}
          >
            {dropdownOptionsWithLevels.grades.map((grade) => (
              <MenuItem key={grade} value={grade}>{grade}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.dropdown} size="small">
          <InputLabel>Level</InputLabel>
          <Select
            value={row.level}
            label="Level"
            onChange={(e) => updateRow(row.id, 'level', e.target.value)}
          >
            {dropdownOptionsWithLevels.levels.map((level) => (
              <MenuItem key={level} value={level}>{level}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.dropdown} size="small">
          <InputLabel>Subject</InputLabel>
          <Select
            value={row.subject}
            label="Subject"
            onChange={(e) => updateRow(row.id, 'subject', e.target.value)}
          >
            {dropdownOptionsWithLevels.subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>{subject}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.dropdown} size="small">
          <InputLabel>Curriculum</InputLabel>
          <Select
            value={row.curriculum}
            label="Curriculum"
            onChange={(e) => updateRow(row.id, 'curriculum', e.target.value)}
          >
            {dropdownOptionsWithLevels.curricula.map((curriculum) => (
              <MenuItem key={curriculum} value={curriculum}>{curriculum}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className={styles.hoursInput}>
          <TextField
            label="Hours"
            type="number"
            size="small"
            value={row.hours}
            onChange={(e) => updateRow(row.id, 'hours', parseInt(e.target.value) || 0)}
            inputProps={{ min: 1, max: 200 }}
            className={styles.hoursField}
          />
        </div>

        <div className={styles.priceDetails}>
          {row.isCalculating ? (
            <div className={styles.loadingPrice}>
              <Typography className={styles.loadingText}>
                Calculating...
              </Typography>
            </div>
          ) : row.calculationError ? (
            <div className={styles.errorPrice}>
              <Typography className={styles.errorText}>
                {row.calculationError}
              </Typography>
            </div>
          ) : (
            <>
              <Typography className={styles.currentPrice}>
                {getCurrencySymbol(getCurrency(row.country))}{row.totalCost.toFixed(0)}
              </Typography>
              {row.savings > 0 && (
                <>
                  <Typography className={styles.originalPrice}>
                    {getCurrencySymbol(getCurrency(row.country))}{row.originalCost.toFixed(0)}
                  </Typography>
                  <Typography className={styles.savingsText}>
                    Save {row.discountPercentage}%
                  </Typography>
                </>
              )}
              {row.discountPercentage > 0 && (
                <Typography className={styles.discountInfo}>
                  {row.finalRate.toFixed(0)} {getCurrency(row.country)}/hour
                </Typography>
              )}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.rowActions}>
        {rows.length > 1 && (
          <IconButton
            onClick={() => removeRow(row.id)}
            className={styles.deleteButton}
            size="small"
          >
            <Delete />
          </IconButton>
        )}
      </div>
    </div>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      className={styles.modal}
      PaperProps={{
        className: styles.modalPaper
      }}
      disableScrollLock={false}
      keepMounted={false}
      scroll="paper"
      disableEscapeKeyDown={false}
    >
      {/* Header */}
      <div className={styles.modalHeader}>
        <Typography variant="h5" className={`${styles.modalTitle} ${leagueSpartan.className}`}>
          Custom Package Builder
        </Typography>
        <IconButton onClick={handleClose} className={styles.closeButton}>
          <Close />
        </IconButton>
      </div>

      {/* Content */}
      <div className={styles.modalContent}>

        {/* Scrollable Package Rows Section */}
        <div className={styles.scrollableContent}>
          <div className={styles.rowsContainer}>
            {rows.map((row, index) => renderRow(row, index))}
          </div>

          {/* Add Row Button */}
          <div className={styles.addRowSection}>
            <Button
              onClick={addNewRow}
              startIcon={<Add />}
              className={styles.addRowButton}
            >
              Add Another Subject
            </Button>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className={styles.fixedBottomSection}>
          <Divider className={styles.divider} />

          {/* Total Summary */}
          <div className={styles.totalSummary}>
            <div className={styles.summaryContent}>
              <Typography className={`${styles.summaryLabel} ${leagueSpartan.className}`}>
                Total Cost
              </Typography>
              <div className={styles.summaryPricing}>
                <Typography className={`${styles.totalPrice} ${leagueSpartan.className}`}>
                  {getCurrencySymbol(getCurrency(userCountry))}{getTotalCost().toFixed(0)}
                </Typography>
                {getTotalSavings() > 0 && (
                  <Typography className={styles.totalSavings}>
                    You save {getCurrencySymbol(getCurrency(userCountry))}{getTotalSavings().toFixed(0)}
                  </Typography>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.modalFooter}>
            <Button
              variant="contained"
              onClick={handleProceed}
              className={`${styles.proceedButton} ${leagueSpartan.className}`}
              fullWidth
              size="large"
            >
              Proceed to Book
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomPricingModal;