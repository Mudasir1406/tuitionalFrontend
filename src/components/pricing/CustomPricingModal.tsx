"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog as HouseDialog } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { CustomPricingSelection } from "@/types/pricing";
import { getCurrencySymbol } from "@/utils/pricing-helpers";
import { DropdownOptions } from "@/services/dropdown/dropdown-api";
import { calculateCustomPricing } from "@/services/pricing/pricing-api";

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

const defaultLevels = ["IGCSE", "A-Levels", "IB", "SAT", "AP"];

const CustomPricingModal: React.FC<CustomPricingModalProps> = ({
  open,
  onClose,
  userCountry,
  dropdownOptions,
}) => {
  const [rows, setRows] = useState<PackageRow[]>([]);

  const opts = {
    grades: dropdownOptions.grades,
    levels: defaultLevels,
    curricula: dropdownOptions.curriculum,
    subjects: dropdownOptions.subjects,
    countries: dropdownOptions.countries,
  };

  const generateRowId = React.useCallback(
    () => `row-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    [],
  );

  const addNewRow = React.useCallback(() => {
    const mappedCountry =
      userCountry === "United States"
        ? "USA"
        : userCountry === "United Kingdom"
          ? "UK"
          : userCountry === "United Arab Emirates"
            ? "UAE"
            : userCountry;
    setRows((prev) => [
      ...prev,
      {
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
      },
    ]);
  }, [userCountry, generateRowId]);

  useEffect(() => {
    if (open && rows.length === 0) addNewRow();
  }, [open, rows.length, addNewRow]);

  const removeRow = (rowId: string) => {
    if (rows.length > 1) setRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  const calculateRealPricing = async (row: PackageRow) => {
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
        hours: row.hours,
      });
      setRows((prev) =>
        prev.map((r) => {
          if (r.id !== row.id) return r;
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
              calculationError: undefined,
            };
          }
          return { ...r, isCalculating: false, calculationError: "No package available for this configuration" };
        }),
      );
    } catch (error) {
      console.error("🔥 Custom Pricing - Calculation error:", error);
      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, isCalculating: false, calculationError: "Error calculating pricing" } : r)),
      );
    }
  };

  const updateRow = (rowId: string, field: keyof PackageRow, value: any) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== rowId) return row;
        const updatedRow = { ...row, [field]: value };
        if (["country", "grade", "level", "curriculum", "subject", "hours"].includes(field as string)) {
          calculateRealPricing(updatedRow);
          return { ...updatedRow, isCalculating: true, calculationError: undefined };
        }
        return updatedRow;
      }),
    );
  };

  const getTotalCost = () => rows.reduce((total, row) => total + row.totalCost, 0);
  const getTotalSavings = () => rows.reduce((total, row) => total + row.savings, 0);

  const getCurrency = (country: string) => {
    const currency = dropdownOptions.currencies?.[country];
    if (currency) return currency;
    const currencyMap: Record<string, string> = {
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

  const renderRow = (row: PackageRow, index: number) => (
    <div key={row.id} className="flex flex-col gap-3 rounded-md border border-ink-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-brand-500 px-3 py-1 font-heading text-small font-bold text-white">
          {index + 1}
        </span>
        {rows.length > 1 && (
          <button
            type="button"
            onClick={() => removeRow(row.id)}
            className="rounded-full p-2 text-ink-700 hover:bg-ink-100 hover:text-danger"
            aria-label="Remove row"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Select
          value={row.grade}
          onChange={(v) => updateRow(row.id, "grade", v)}
          options={opts.grades.map((g) => ({ value: g, label: g }))}
          placeholder="Grade"
          ariaLabel="Grade"
        />
        <Select
          value={row.level}
          onChange={(v) => updateRow(row.id, "level", v)}
          options={opts.levels.map((l) => ({ value: l, label: l }))}
          placeholder="Level"
          ariaLabel="Level"
        />
        <Select
          value={row.subject}
          onChange={(v) => updateRow(row.id, "subject", v)}
          options={opts.subjects.map((s) => ({ value: s, label: s }))}
          placeholder="Subject"
          ariaLabel="Subject"
        />
        <Select
          value={row.curriculum}
          onChange={(v) => updateRow(row.id, "curriculum", v)}
          options={opts.curricula.map((c) => ({ value: c, label: c }))}
          placeholder="Curriculum"
          ariaLabel="Curriculum"
        />
        <input
          type="number"
          value={row.hours}
          onChange={(e) => updateRow(row.id, "hours", parseInt(e.target.value) || 0)}
          min={1}
          max={200}
          aria-label="Hours"
          className="h-11 rounded-md bg-white px-4 font-body text-form-input text-ink-900 shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {row.isCalculating ? (
          <span className="font-heading text-small text-ink-700">Calculating...</span>
        ) : row.calculationError ? (
          <span className="font-heading text-small text-danger">{row.calculationError}</span>
        ) : (
          <>
            <span className="font-heading text-h5 font-bold text-brand-500">
              {getCurrencySymbol(getCurrency(row.country))}
              {row.totalCost.toFixed(0)}
            </span>
            {row.savings > 0 && (
              <>
                <span className="font-heading text-small text-ink-500 line-through">
                  {getCurrencySymbol(getCurrency(row.country))}
                  {row.originalCost.toFixed(0)}
                </span>
                <span className="font-heading text-small font-semibold text-success">
                  Save {row.discountPercentage}%
                </span>
              </>
            )}
            {row.discountPercentage > 0 && (
              <span className="font-heading text-small text-ink-700">
                {row.finalRate.toFixed(0)} {getCurrency(row.country)}/hour
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <HouseDialog open={open} onClose={handleClose} title="Custom Package Builder" size="xl">
      <div className="flex flex-col gap-4">
        <div className="max-h-[50vh] overflow-y-auto pr-1">
          <div className="flex flex-col gap-3">
            {rows.map((row, index) => renderRow(row, index))}
          </div>
        </div>

        <div className="flex justify-start">
          <Button onClick={addNewRow} variant="outline" className="font-heading">
            <Plus size={18} />
            Add Another Subject
          </Button>
        </div>

        <hr className="border-ink-200" />

        <div className="rounded-md bg-brand-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-heading text-h5 text-ink-900">Total Cost</span>
            <div className="text-right">
              <span className="font-heading text-h3 font-bold text-brand-500">
                {getCurrencySymbol(getCurrency(userCountry))}
                {getTotalCost().toFixed(0)}
              </span>
              {getTotalSavings() > 0 && (
                <p className="font-heading text-small font-semibold text-success">
                  You save {getCurrencySymbol(getCurrency(userCountry))}
                  {getTotalSavings().toFixed(0)}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button variant="primary" size="lg" className="w-full font-heading" onClick={handleClose}>
          Proceed to Book
        </Button>
      </div>
    </HouseDialog>
  );
};

export default CustomPricingModal;
