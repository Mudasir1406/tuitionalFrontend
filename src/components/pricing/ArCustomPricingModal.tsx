"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Close, Delete } from "@mui/icons-material";
import { leagueSpartan } from "@/app/fonts";
import { CustomPricingSelection } from "@/types/pricing";
import {
  SUPPORTED_COUNTRIES,
  getCurrencySymbol,
} from "@/utils/pricing-helpers";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";
import { calculateCustomPricing } from "@/services/pricing/pricing-api";
import styles from "./CustomPricingModal.module.css";

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

interface ArCustomPricingModalProps {
  open: boolean;
  onClose: () => void;
  userCountry: string;
  dropdownOptions: DropdownOptions;
}

const ArCustomPricingModal: React.FC<ArCustomPricingModalProps> = ({
  open,
  onClose,
  userCountry,
  dropdownOptions,
}) => {
  const [rows, setRows] = useState<PackageRow[]>([]);
  // Default levels (not in dropdown collection)
  const defaultLevels = ["IGCSE", "A-Levels", "IB", "SAT", "AP"];

  // Use same dropdown options as English modal (from props)
  const dropdownOptionsWithLevels = {
    grades: dropdownOptions.grades || [
      "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
      "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
      "Grade 11", "Grade 12"
    ],
    levels: defaultLevels, // levels not in Firebase, use default
    curricula: dropdownOptions.curriculum || [
      "British", "American", "IB", "Canadian", "Australian",
      "IGCSE", "A-Levels", "SAT", "AP", "CBSE", "ICSE"
    ],
    subjects: dropdownOptions.subjects || [
      "Mathematics", "Physics", "Chemistry", "Biology", "English", "Arabic",
      "Computer Science", "Economics", "Business Studies", "Accounting",
      "History", "Geography", "Psychology", "Art & Design", "French", "Spanish"
    ],
    countries: dropdownOptions.countries || [
      "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait",
      "Bahrain", "Oman", "United States", "United Kingdom", "Canada"
    ],
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
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  const generateRowId = () =>
    `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addNewRow = () => {
    // Map userCountry to dropdown format if needed
    const mappedCountry =
      userCountry === "United States"
        ? "USA"
        : userCountry === "United Kingdom"
        ? "UK"
        : userCountry === "United Arab Emirates"
        ? "UAE"
        : userCountry;

    const newRow: PackageRow = {
      id: generateRowId(),
      country: mappedCountry,
      grade: "",
      level: "",
      curriculum: "",
      subject: "",
      hours: 10,
      baseRate: 85,
      discountPercentage: 0,
      finalRate: 85,
      totalCost: 850,
      originalCost: 850,
      savings: 0,
      isCalculating: false,
      calculationError: undefined,
    };
    setRows((prev) => [...prev, newRow]);
  };

  const removeRow = (rowId: string) => {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((row) => row.id !== rowId));
    }
  };

  const updateRow = (rowId: string, field: keyof PackageRow, value: any) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id === rowId) {
          const updatedRow = { ...row, [field]: value };

          // If academic fields changed, recalculate pricing from database
          if (
            [
              "country",
              "grade",
              "level",
              "curriculum",
              "subject",
              "hours",
            ].includes(field)
          ) {
            calculateRealPricing(updatedRow);
            return {
              ...updatedRow,
              isCalculating: true,
              calculationError: undefined,
            };
          }

          return updatedRow;
        }
        return row;
      })
    );
  };

  // Real-time pricing calculation using database
  const calculateRealPricing = async (row: PackageRow) => {
    // Check if all required fields are filled
    if (
      !row.country ||
      !row.grade ||
      !row.level ||
      !row.curriculum ||
      !row.subject ||
      !row.hours
    ) {
      return;
    }

    try {
      const pricingRequest: CustomPricingSelection = {
        country: row.country,
        grade: row.grade,
        level: row.level,
        curriculum: row.curriculum,
        subject: row.subject,
        hours: row.hours,
      };

      const result:any = await calculateCustomPricing(pricingRequest);

      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? {
                ...r,
                baseRate: result.baseRate,
                discountPercentage: result.discountPercentage,
                finalRate: result.finalRate,
                totalCost: result.totalCost,
                originalCost: result.originalCost,
                savings: result.savings,
                isCalculating: false,
                calculationError: undefined,
              }
            : r
        )
      );
    } catch (error) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? {
                ...r,
                isCalculating: false,
                calculationError: "خطأ في حساب السعر",
              }
            : r
        )
      );
    }
  };

  const getTotalCost = () => {
    return rows.reduce((total, row) => total + row.totalCost, 0);
  };

  const getTotalSavings = () => {
    return rows.reduce((total, row) => total + row.savings, 0);
  };

  const getCurrency = (country: string) => {
    const currency = dropdownOptions.currencies?.[country];
    if (currency) return currency;

    const currencyMap: { [key: string]: string } = {
      USA: "USD",
      UK: "GBP",
      UAE: "AED",
      "Saudi Arabia": "SAR",
      Qatar: "QAR",
      Kuwait: "KWD",
      Canada: "CAD",
      Australia: "AUD",
      Oman: "OMR",
      Bahrain: "BHD",
    };

    return currencyMap[country] || "USD";
  };

  const handleClose = () => {
    setRows([]);
    onClose();
  };

  const handleProceed = () => {
    handleClose();
  };

  const renderRow = (row: PackageRow, index: number) => (
    <div key={row.id} className={styles.packageRow} dir="rtl">
      {/* Row Number */}
      <div className={styles.rowNumber}>
        <Typography
          className={`${styles.rowNumberText} ${leagueSpartan.className}`}
        >
          {index + 1}
        </Typography>
      </div>

      {/* Row Content */}
      <div className={styles.rowContent}>
        <FormControl className={styles.dropdown} size="small">
          <InputLabel>المرحلة</InputLabel>
          <Select
            value={row.grade}
            label="المرحلة"
            onChange={(e) => updateRow(row.id, "grade", e.target.value)}
          >
            {dropdownOptionsWithLevels.grades.map((grade) => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.dropdown} size="small">
          <InputLabel>المستوى</InputLabel>
          <Select
            value={row.level}
            label="المستوى"
            onChange={(e) => updateRow(row.id, "level", e.target.value)}
          >
            {dropdownOptionsWithLevels.levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.dropdown} size="small">
          <InputLabel>المادة</InputLabel>
          <Select
            value={row.subject}
            label="المادة"
            onChange={(e) => updateRow(row.id, "subject", e.target.value)}
          >
            {dropdownOptionsWithLevels.subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={styles.dropdown} size="small">
          <InputLabel>المنهج</InputLabel>
          <Select
            value={row.curriculum}
            label="المنهج"
            onChange={(e) => updateRow(row.id, "curriculum", e.target.value)}
          >
            {dropdownOptionsWithLevels.curricula.map((curriculum) => (
              <MenuItem key={curriculum} value={curriculum}>
                {curriculum}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="عدد الساعات"
          type="number"
          value={row.hours}
          onChange={(e) =>
            updateRow(row.id, "hours", parseInt(e.target.value) || 0)
          }
          className={styles.hoursInput}
          size="small"
          inputProps={{ min: 1, max: 100 }}
        />

        {/* Pricing Display */}
        <div className={styles.pricingDisplay}>
          {row.isCalculating ? (
            <Typography className={styles.calculatingText}>
              جاري الحساب...
            </Typography>
          ) : row.calculationError ? (
            <Typography className={styles.errorText}>
              {row.calculationError}
            </Typography>
          ) : (
            <>
              {row.discountPercentage === 0 ? (
                <Typography
                  className={`${styles.rateText} ${leagueSpartan.className}`}
                >
                  {row.finalRate.toFixed(0)} {getCurrency(row.country)}/ساعة
                </Typography>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <Typography
                      className={`${styles.originalRate} ${leagueSpartan.className}`}
                    >
                      {row.baseRate.toFixed(0)} {getCurrency(row.country)}/ساعة
                    </Typography>
                    <div className={styles.discountBadge}>
                      {row.discountPercentage.toFixed(0)}% خصم
                    </div>
                  </div>
                  <Typography
                    className={`${styles.discountedRate} ${leagueSpartan.className}`}
                  >
                    {row.finalRate.toFixed(0)} {getCurrency(row.country)}/ساعة
                  </Typography>
                </>
              )}
              <Typography
                className={`${styles.totalCostText} ${leagueSpartan.className}`}
              >
                المجموع: {getCurrencySymbol(getCurrency(row.country))}
                {row.totalCost.toFixed(0)}
              </Typography>
              {row.savings > 0 && (
                <Typography className={`${styles.discountInfo} ${leagueSpartan.className}`}>
                  توفر {getCurrencySymbol(getCurrency(row.country))}{row.savings.toFixed(0)}
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
        className: styles.modalPaper,
      }}
      disableScrollLock={false}
      keepMounted={false}
      scroll="paper"
      disableEscapeKeyDown={false}
    >
      {/* Header */}
      <div className={styles.modalHeader} dir="rtl">
        <Typography
          variant="h5"
          className={`${styles.modalTitle} ${leagueSpartan.className}`}
        >
          منشئ الباقات المخصصة
        </Typography>
        <IconButton onClick={handleClose} className={styles.closeButton}>
          <Close />
        </IconButton>
      </div>

      {/* Content */}
      <div className={styles.modalContent} dir="rtl">
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
              إضافة مادة أخرى
            </Button>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className={styles.fixedBottomSection}>
          <Divider className={styles.divider} />

          {/* Total Summary */}
          <div className={styles.totalSummary}>
            <div className={styles.summaryContent}>
              <Typography
                className={`${styles.summaryLabel} ${leagueSpartan.className}`}
              >
                إجمالي التكلفة
              </Typography>
              <div className={styles.summaryPricing}>
                <Typography
                  className={`${styles.totalPrice} ${leagueSpartan.className}`}
                >
                  {getCurrencySymbol(getCurrency(userCountry))}
                  {getTotalCost().toFixed(0)}
                </Typography>
                {getTotalSavings() > 0 && (
                  <Typography className={styles.totalSavings}>
                    توفر {getCurrencySymbol(getCurrency(userCountry))}
                    {getTotalSavings().toFixed(0)}
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
              المتابعة للحجز
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ArCustomPricingModal;
